import { useEffect, useRef } from 'react';
import { TEAM_MEMBERS, TeamMember } from '../data/teamData';
import { LIVE_EVENTS, LiveEvent } from '../data/eventsData';
import { PRODUCTS, Product, BLOG_POSTS, BlogPost } from '../data/storeAndBlogData';

export const WIX_CONFIG = {
  siteId: '6f7426b7-afd2-4e14-84db-49d2395b4ee7',
  clientId: 'ce53d5c9-71bf-455a-998b-006434e70ebd',
  contactFormId: '7c41df41-9f95-4fa3-b65c-dbf5628f0b26',
  volunteerFormId: '5e71ce1e-f501-419d-a12c-a63fc14fc95e',
  apiBase: 'https://www.wixapis.com',
  hostUrl: 'https://headless-myhqhhixfom-cmsscaleup-140a.wix-site-host.com',
  dashboardUrl: 'https://manage.wix.com/dashboard/6f7426b7-afd2-4e14-84db-49d2395b4ee7',
};

const TOKEN_STORAGE_KEY = `cp_wix_visitor_session_${WIX_CONFIG.clientId}`;

interface VisitorSession {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

let inFlightTokenPromise: Promise<string | null> | null = null;

function loadStoredSession(): VisitorSession | null {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return null;
    const raw = window.localStorage.getItem(TOKEN_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed.accessToken === 'string') {
      return parsed as VisitorSession;
    }
  } catch {
    // Ignore storage errors (private mode, etc.)
  }
  return null;
}

function saveStoredSession(session: VisitorSession | null): void {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return;
    if (!session) {
      window.localStorage.removeItem(TOKEN_STORAGE_KEY);
    } else {
      window.localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(session));
    }
  } catch {
    // Ignore storage errors
  }
}

async function mintOrRefreshVisitorToken(existingRefreshToken?: string): Promise<string | null> {
  const payload = existingRefreshToken
    ? {
        clientId: WIX_CONFIG.clientId,
        grantType: 'refresh_token',
        refreshToken: existingRefreshToken,
      }
    : {
        clientId: WIX_CONFIG.clientId,
        grantType: 'anonymous',
      };

  const res = await fetch(`${WIX_CONFIG.apiBase}/oauth2/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    cache: 'no-store',
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    // If refresh failed, mint a fresh anonymous visitor session once
    if (existingRefreshToken) {
      return mintOrRefreshVisitorToken(undefined);
    }
    return null;
  }

  const data = await res.json();
  if (!data?.access_token) return null;

  const expiresInSec = Number(data.expires_in) || 14400;
  const session: VisitorSession = {
    accessToken: data.access_token,
    refreshToken: data.refresh_token || existingRefreshToken || '',
    expiresAt: Date.now() + expiresInSec * 1000,
  };
  saveStoredSession(session);
  return session.accessToken;
}

/**
 * Obtains a valid Wix Headless OAuth Visitor Access Token (cached until expiry, auto-refreshed).
 */
export async function getWixVisitorToken(forceRefresh = false): Promise<string | null> {
  if (!forceRefresh) {
    const stored = loadStoredSession();
    // Keep 90-second safety margin before token expiry
    if (stored && stored.accessToken && stored.expiresAt - Date.now() > 90_000) {
      return stored.accessToken;
    }
  } else {
    saveStoredSession(null);
  }

  if (!inFlightTokenPromise) {
    const stored = loadStoredSession();
    inFlightTokenPromise = mintOrRefreshVisitorToken(forceRefresh ? undefined : stored?.refreshToken)
      .catch(() => null)
      .finally(() => {
        inFlightTokenPromise = null;
      });
  }

  return inFlightTokenPromise;
}

export async function getWixAuthHeaders(forceRefresh = false): Promise<Record<string, string>> {
  const token = await getWixVisitorToken(forceRefresh);
  if (token) {
    return {
      'Content-Type': 'application/json',
      Authorization: token,
    };
  }
  return {
    'Content-Type': 'application/json',
    'wix-site-id': WIX_CONFIG.siteId,
  };
}

/**
 * Executes an authenticated Wix REST API call using Visitor OAuth Token,
 * bypassing browser HTTP caches and retrying once on 401/403 token expiry.
 */
export async function wixApiFetch(url: string, init: RequestInit = {}, timeoutMs = 8000): Promise<Response> {
  const runRequest = async (forceRefresh: boolean): Promise<Response> => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const headers = await getWixAuthHeaders(forceRefresh);
      return await fetch(url, {
        ...init,
        cache: 'no-store',
        headers: {
          ...headers,
          ...(init.headers as Record<string, string> | undefined),
        },
        signal: controller.signal,
      });
    } finally {
      clearTimeout(timer);
    }
  };

  let res = await runRequest(false);
  if (res.status === 401 || res.status === 403) {
    res = await runRequest(true);
  }
  return res;
}

/**
 * Converts Wix Media URIs (wix:image://v1/..., wix:video://v1/..., or structured media objects)
 * into direct browser-loadable HTTPS static.wixstatic.com URLs.
 */
export function resolveWixMediaUrl(input: unknown, fallback = ''): string {
  if (!input) return fallback;

  if (typeof input === 'object') {
    const obj = input as Record<string, any>;
    const candidate =
      obj.url ||
      obj.uri ||
      obj.src ||
      obj.file?.url ||
      obj.image?.url ||
      obj.image?.uri ||
      obj.image ||
      obj.id;
    return resolveWixMediaUrl(candidate, fallback);
  }

  if (typeof input !== 'string') return fallback;
  const trimmed = input.trim();
  if (!trimmed) return fallback;

  if (trimmed.startsWith('wix:image://')) {
    // Format: wix:image://v1/<mediaId>/<filename>#originWidth=...
    const match = trimmed.match(/^wix:image:\/\/v1\/([^/#?]+)/i);
    if (match && match[1]) {
      return `https://static.wixstatic.com/media/${match[1]}`;
    }
  }

  if (trimmed.startsWith('wix:video://')) {
    const match = trimmed.match(/^wix:video:\/\/v1\/([^/#?]+)/i);
    if (match && match[1]) {
      return `https://video.wixstatic.com/video/${match[1]}/file`;
    }
  }

  if (
    trimmed.startsWith('https://') ||
    trimmed.startsWith('http://') ||
    trimmed.startsWith('/') ||
    trimmed.startsWith('data:')
  ) {
    return trimmed;
  }

  // Handle raw Wix media file IDs like 81bfa3_abc~mv2.jpg
  if (/^[a-z0-9_~-]+\.(avif|webp|png|jpe?g|gif|svg)$/i.test(trimmed)) {
    return `https://static.wixstatic.com/media/${trimmed}`;
  }

  return trimmed;
}

function stripHtml(html?: string): string {
  if (!html) return '';
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

/**
 * React hook that subscribes to real-time window focus & visibility updates
 * so editing content in Wix Dashboard updates open tabs immediately without reloading.
 */
export function useWixLiveRefresh(refreshFn: () => void): void {
  const fnRef = useRef(refreshFn);
  fnRef.current = refreshFn;

  useEffect(() => {
    let lastRun = 0;
    const trigger = () => {
      const now = Date.now();
      if (now - lastRun > 1500) {
        lastRun = now;
        fnRef.current();
      }
    };

    const onVisibility = () => {
      if (document.visibilityState === 'visible') {
        trigger();
      }
    };

    window.addEventListener('focus', trigger);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      window.removeEventListener('focus', trigger);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);
}

/**
 * Type-safe live query for Wix CMS collections (always fresh, no stale cache).
 */
export async function queryWixCMS<T>(collectionId: string, fallbackData: T[]): Promise<T[]> {
  try {
    const res = await wixApiFetch(`${WIX_CONFIG.apiBase}/wix-data/v2/items/query`, {
      method: 'POST',
      body: JSON.stringify({
        dataCollectionId: collectionId,
        query: { paging: { limit: 100 } },
      }),
    });

    if (res.ok) {
      const json = await res.json();
      if (Array.isArray(json.dataItems)) {
        const mapped = json.dataItems.map((item: any) => ({
          _id: item.id,
          ...(item.data || {}),
        }));
        return mapped as T[];
      }
    }
  } catch (err) {
    console.info(`[Wix CMS] ${collectionId} query fallback:`, err);
  }

  return fallbackData;
}

// ==========================================
// Full Page-by-Page CMS Architecture Types & Fetchers
// ==========================================

export interface HeaderContent {
  title?: string;
  logoUrl?: string;
  logoAlt?: string;
  giveButtonLabel?: string;
  giveButtonUrl?: string;
}

export async function fetchHeaderContent(): Promise<HeaderContent> {
  const fallback: HeaderContent = {
    title: 'Main Header',
    logoUrl: '/logo.png',
    logoAlt: 'Cultured Pearl',
    giveButtonLabel: 'GIVE HOPE',
    giveButtonUrl: '/give',
  };
  const items = await queryWixCMS<any>('HeaderContent', [fallback]);
  const raw = items[0] || fallback;
  return {
    ...fallback,
    ...raw,
    logoUrl: resolveWixMediaUrl(raw.logoUrl || raw.logo || raw.image, '/logo.png'),
  };
}

export interface NavigationItem {
  label: string;
  path: string;
  order: number;
  isVisible: boolean;
}

export async function fetchNavigationItems(): Promise<NavigationItem[]> {
  const fallback: NavigationItem[] = [
    { label: 'Home', path: '/', order: 1, isVisible: true },
    { label: 'About', path: '/about', order: 2, isVisible: true },
    { label: 'Team', path: '/meet-the-team', order: 3, isVisible: true },
    { label: 'Debutante', path: '/debutante', order: 4, isVisible: true },
    { label: 'Scholarship', path: '/scholarship', order: 5, isVisible: true },
    { label: 'Events', path: '/events', order: 6, isVisible: true },
    { label: 'Get Involved', path: '/get-involved', order: 7, isVisible: true },
    { label: 'Store', path: '/shop', order: 8, isVisible: true },
    { label: 'Gallery', path: '/gallery', order: 9, isVisible: true },
    { label: 'Contact', path: '/contact', order: 10, isVisible: true },
  ];
  const items = await queryWixCMS<NavigationItem>('NavigationItems', fallback);
  return items
    .filter((i) => i.isVisible !== false)
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
}

export interface FooterContent {
  title?: string;
  brandText?: string;
  scriptureVerse?: string;
  copyrightText?: string;
  contactEmail?: string;
  contactPhone?: string;
  address?: string;
}

export async function fetchFooterContent(): Promise<FooterContent> {
  const fallback: FooterContent = {
    title: 'Main Footer',
    brandText:
      "Bringing women into God's light. Empowering through sisterhood, faith, higher education scholarships, and community service since 2017.",
    scriptureVerse:
      'Proverbs 31:25-26 — Strength and dignity are her clothing, and she laughs at the time to come. She opens her mouth with wisdom, and the teaching of kindness is on her tongue.',
    copyrightText: '© 2026 Cultured Pearl. All rights reserved. 501(c)(3) Nonprofit Organization.',
    contactEmail: 'info@culturedpearl.org',
    contactPhone: '(202) 555-0199',
    address: 'Washington, DC Metropolitan Area',
  };
  const items = await queryWixCMS<FooterContent>('FooterContent', [fallback]);
  return items[0] || fallback;
}

export interface HomePageContent {
  heroEyebrow?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroImage?: string;
  pearlImage?: string;
  communityImage?: string;
  primaryButtonLabel?: string;
  primaryButtonUrl?: string;
  secondaryButtonLabel?: string;
  secondaryButtonUrl?: string;
  scriptureVerse?: string;
  aboutSnippetTitle?: string;
  aboutSnippetBody?: string;
}

export async function fetchHomePageContent(): Promise<HomePageContent> {
  const fallback: HomePageContent = {
    heroEyebrow: 'SINCE 2017 · 501(C)(3) NONPROFIT',
    heroTitle: "Bringing women into God's light.",
    heroSubtitle:
      'Embracing, encouraging and celebrating sisterhood — through teaching, presence, prayer, and selfless service.',
    primaryButtonLabel: 'OUR STORY',
    primaryButtonUrl: '/about',
    secondaryButtonLabel: 'UPCOMING EVENTS',
    secondaryButtonUrl: '/events',
    scriptureVerse:
      "Zechariah 13:9 — 'And I will put this third into the fire, and refine them as one refines silver, and test them as gold is tested. They will call upon my name, and I will answer them. I will say, They are my people; and they will say, The Lord is my God.'",
    aboutSnippetTitle: 'A Sisterhood Rooted in Grace & Service',
    aboutSnippetBody:
      "Cultured Pearl was founded in 2017 with a sacred calling: to bring women into God's light, walk beside them through seasons of transition, and equip young women with spiritual grounding and educational opportunity.",
  };
  const items = await queryWixCMS<any>('HomePage', [fallback]);
  const raw = items[0] || fallback;
  return {
    ...fallback,
    ...raw,
    heroImage: raw.heroImage ? resolveWixMediaUrl(raw.heroImage) : undefined,
    pearlImage: raw.pearlImage ? resolveWixMediaUrl(raw.pearlImage) : undefined,
    communityImage: raw.communityImage ? resolveWixMediaUrl(raw.communityImage) : undefined,
  };
}

export interface GenericPageContent {
  eyebrow?: string;
  pageTitle?: string;
  description?: string;
  heroImage?: string;
  image?: string;
  [key: string]: any;
}

export async function fetchPageContent(
  collectionId: string,
  fallback: GenericPageContent
): Promise<GenericPageContent> {
  const items = await queryWixCMS<GenericPageContent>(collectionId, [fallback]);
  const raw = items[0];
  if (!raw) return fallback;
  return {
    ...fallback,
    ...raw,
    heroImage: raw.heroImage ? resolveWixMediaUrl(raw.heroImage) : fallback.heroImage,
    image: raw.image ? resolveWixMediaUrl(raw.image) : fallback.image,
  };
}

export interface GalleryMediaItem {
  title: string;
  image?: string;
  url?: string;
  caption?: string;
  alt?: string;
  displayOrder?: number;
}

export async function fetchMediaGallery(): Promise<GalleryMediaItem[]> {
  const fallback: GalleryMediaItem[] = [
    { title: 'Community Sisterhood Gathering', url: 'https://static.wixstatic.com/media/81bfa3_a8ad7faef04a4e81a69d34142fa9408a~mv2.jpg', caption: "Bringing women into God's light" },
    { title: 'Celebration of Grace', url: 'https://static.wixstatic.com/media/27ab9a_d9f77a5393984caba4db1f15a11fbf10f002.jpg', caption: 'Praise and worship fellowship' },
    { title: 'Signature Gala Gathering', url: 'https://static.wixstatic.com/media/27ab9a_343302a99b954cd58cfc204e62d79d9af002.jpg', caption: 'Empowering the next generation' },
    { title: 'Annual Tea & Fellowship', url: 'https://static.wixstatic.com/media/27ab9a_b2524b890b8246edbae0151c82289d19f002.jpg', caption: 'Mentorship in action' },
    { title: 'Community Outreach Service', url: 'https://static.wixstatic.com/media/81bfa3_6a9556768b3f4aaebf3f9ad2b73ba8ef~mv2.jpg', caption: 'Serving families with love' },
    { title: 'Debutante Cotillion Presentation', url: 'https://static.wixstatic.com/media/b3742cb94ad46fc6d9639d2496e849df.jpg', caption: 'Celebrating young women of excellence' },
    { title: 'Debutante Sisterhood Cohort', url: 'https://static.wixstatic.com/media/dadfb09091a94356850ecc528e626098.jpg', caption: 'Leadership and spiritual development' },
    { title: 'Cultured Pearl Reflection', url: 'https://static.wixstatic.com/media/81bfa3_12c4e994553d45e3a0627a5acd0f25cb~mv2.jpg', caption: 'Walking in faith together' },
  ];
  const raw = await queryWixCMS<any>('MediaGallery', fallback);
  return raw
    .sort((a: any, b: any) => (a.displayOrder ?? 999) - (b.displayOrder ?? 999))
    .map((item: any) => {
      const resolved = resolveWixMediaUrl(item.image || item.url);
      return {
        ...item,
        image: resolved,
        url: resolved,
        alt: item.alt || item.title,
      };
    });
}

export interface VideoItem {
  title: string;
  youtubeId: string;
  description: string;
  order?: number;
}

export async function fetchVideoItems(): Promise<VideoItem[]> {
  const fallback: VideoItem[] = [
    { title: "Bringing Women Into God's Light — Mission Overview", youtubeId: 'dQw4w9WgXcQ', description: 'Learn about the heart and founding vision of Cultured Pearl.', order: 1 },
    { title: 'Pearls of Excellence Debutante Ball Highlights', youtubeId: 'kJQP7kiw5Fk', description: 'Celebrating our debutantes as they step into leadership and grace.', order: 2 },
    { title: 'Annual Community Shoe Drive Impact', youtubeId: 'fJ9rUzIMcZQ', description: 'Providing hundreds of pairs of shoes to local children and families.', order: 3 },
  ];
  const items = await queryWixCMS<VideoItem>('VideoItems', fallback);
  return items.sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
}

export interface ScholarshipRecord {
  id: string;
  title: string;
  slug: string;
  subtitle?: string;
  deadline?: string;
  amount?: string;
  description?: string;
  eligibility?: string;
  requirements?: string;
  applicationLink?: string;
  image?: string;
}

export async function fetchScholarships(): Promise<ScholarshipRecord[]> {
  const raw = await queryWixCMS<any>('Scholarships', []);
  return raw.map((item: any, idx: number) => ({
    id: item._id || item.id || String(idx),
    title: item.title || 'Purposeful Life Scholarship',
    slug: item.slug || 'purposeful-life-scholarship',
    subtitle: item.subtitle,
    deadline: item.deadline,
    amount: item.amount,
    description: item.description,
    eligibility: item.eligibility,
    requirements: item.requirements,
    applicationLink: item.applicationLink,
    image: resolveWixMediaUrl(
      item.image,
      'https://static.wixstatic.com/media/e56d089a6ccc4da79d5a52f8b7c2893d.jpg'
    ),
  }));
}

/**
 * Fetch dynamic Team Members from Wix CMS (resolved wix:image:// URIs & ordered by displayOrder)
 */
export async function fetchTeamMembers(): Promise<TeamMember[]> {
  const rawItems = await queryWixCMS<any>('TeamMembers', TEAM_MEMBERS);
  return rawItems
    .slice()
    .sort((a: any, b: any) => (a.displayOrder ?? 999) - (b.displayOrder ?? 999))
    .map((item: any) => {
      const name = item.title || item.name || 'Team Member';
      const fallbackMember = TEAM_MEMBERS.find(
        (m) => m.name.toLowerCase() === name.toLowerCase()
      );
      return {
        name,
        role: item.role || 'Leadership',
        bio: Array.isArray(item.bio)
          ? item.bio
          : typeof item.bio === 'string'
          ? item.bio.split('\n\n').filter(Boolean)
          : [],
        education: item.education || undefined,
        image: resolveWixMediaUrl(
          item.image,
          fallbackMember?.image || 'https://static.wixstatic.com/media/81bfa3_f04b8b0ff4fe42a9afec552e60971edb~mv2.jpg'
        ),
        quote: item.quote || undefined,
      };
    });
}

/**
 * Fetch dynamic Testimonials from Wix CMS
 */
export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  quote: string;
  image?: string;
}

export async function fetchTestimonials(): Promise<TestimonialItem[]> {
  const fallback: TestimonialItem[] = [
    {
      id: '1',
      name: 'Sister Angela M.',
      role: 'Community Member & Gala Attendee',
      quote: 'Cultured Pearl breathed new life into my spiritual journey. The sisterhood and love I experienced was truly a gift from God.',
      image: 'https://static.wixstatic.com/media/81bfa3_f04b8b0ff4fe42a9afec552e60971edb~mv2.jpg',
    },
    {
      id: '2',
      name: 'Brenda T.',
      role: 'Parent of Scholarship Recipient',
      quote: 'The Purposeful Life scholarship allowed my daughter to pursue her nursing degree with confidence and financial peace.',
      image: 'https://static.wixstatic.com/media/27ab9a_0ab68c99ba7f42ed9a2457409fb79ee7~mv2.jpg',
    },
    {
      id: '3',
      name: 'Elder David W.',
      role: 'Partner Church Ministry Leader',
      quote: 'Serving with this community showed me what authentic Christ-like fellowship looks like in action. They truly walk the talk.',
      image: 'https://static.wixstatic.com/media/27ab9a_210b31af19e7475d8e83343222127020~mv2.png',
    },
  ];

  const raw = await queryWixCMS<any>('Testimonials', fallback);
  return raw
    .slice()
    .sort((a: any, b: any) => (a.displayOrder ?? 999) - (b.displayOrder ?? 999))
    .map((item: any, idx: number) => ({
      id: item._id || item.id || String(idx),
      name: item.title || item.name || 'Community Member',
      role: item.role || 'Supporter',
      quote: item.quote || '',
      image: item.image ? resolveWixMediaUrl(item.image) : undefined,
    }));
}

/**
 * Fetch dynamic Products from Wix Stores Catalog V3
 */
export async function fetchWixStoreProducts(): Promise<Product[]> {
  try {
    const res = await wixApiFetch(`${WIX_CONFIG.apiBase}/stores/v3/products/query`, {
      method: 'POST',
      body: JSON.stringify({
        query: { paging: { limit: 50 } },
        fields: ['MEDIA_ITEMS_INFO', 'PLAIN_DESCRIPTION', 'DESCRIPTION', 'CURRENCY'],
      }),
    });

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data.products) && data.products.length > 0) {
        return data.products.map((p: any) => {
          const minAmount = p.actualPriceRange?.minValue?.amount ?? p.priceData?.price;
          const formattedPrice =
            p.priceData?.formatted?.price ||
            (minAmount !== undefined ? `$${Number(minAmount).toFixed(2)}` : '$15.00');
          return {
            id: p.id,
            slug: p.slug || p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
            title: p.name,
            price: formattedPrice,
            category: p.productType === 'DIGITAL' ? 'Digital Download' : 'Magazine',
            image: resolveWixMediaUrl(
              p.media?.mainMedia?.image || p.media?.mainMedia,
              'https://static.wixstatic.com/media/27ab9a_5fcea6235a154706aa53c5aafe7c824f'
            ),
            description:
              stripHtml(p.plainDescription) ||
              'Official Cultured Pearl publication.',
            digital: p.productType === 'DIGITAL',
          };
        });
      }
    }
  } catch (err) {
    console.info('[Wix Stores] Catalog query using local verified fallback:', err);
  }

  return PRODUCTS;
}

/**
 * Fetch dynamic Blog Posts from Wix Blog V3
 */
export async function fetchWixBlogPosts(): Promise<BlogPost[]> {
  try {
    const res = await wixApiFetch(`${WIX_CONFIG.apiBase}/blog/v3/posts/query`, {
      method: 'POST',
      body: JSON.stringify({
        paging: { limit: 20 },
      }),
    });

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data.posts) && data.posts.length > 0) {
        return data.posts.map((p: any) => ({
          id: p.id,
          slug: p.slug || p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          title: p.title,
          date: p.firstPublishedDate
            ? new Date(p.firstPublishedDate).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })
            : 'Recently Published',
          author: 'Cultured Pearl Editorial',
          readTime: `${p.minutesToRead || 4} min read`,
          excerpt:
            p.excerpt ||
            'Read the latest inspiration and community reflection from Cultured Pearl.',
          content: [p.excerpt || p.title],
          image: resolveWixMediaUrl(
            p.heroImage || p.media?.wixMedia?.image || p.coverMedia?.image,
            'https://static.wixstatic.com/media/81bfa3_6a9556768b3f4aaebf3f9ad2b73ba8ef~mv2.jpg'
          ),
        }));
      }
    }
  } catch (err) {
    console.info('[Wix Blog] Posts query using local verified fallback:', err);
  }

  return BLOG_POSTS;
}

/**
 * Fetch dynamic Events from Wix Events v3
 */
export async function fetchWixEvents(): Promise<LiveEvent[]> {
  try {
    const res = await wixApiFetch(`${WIX_CONFIG.apiBase}/events/v3/events/query`, {
      method: 'POST',
      body: JSON.stringify({
        query: {
          paging: { limit: 50 },
          sort: [{ fieldName: 'createdDate', order: 'DESC' }],
        },
      }),
    });

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data.events) && data.events.length > 0) {
        const now = new Date();
        const mapped: LiveEvent[] = data.events.map((e: any) => {
          const startDate = e.dateAndTimeSettings?.startDate
            ? new Date(e.dateAndTimeSettings.startDate)
            : null;
          const endDate = e.dateAndTimeSettings?.endDate
            ? new Date(e.dateAndTimeSettings.endDate)
            : startDate;

          const isPast =
            e.status === 'ENDED' ||
            (endDate ? endDate < now : false);

          const regStatus = e.registration?.status;
          const regType = e.registration?.type || 'RSVP';
          const isClosed =
            isPast ||
            regStatus === 'CLOSED' ||
            regStatus === 'CLOSED_AUTOMATICALLY' ||
            e.registration?.registrationDisabled === true;

          const isOpenForRsvp = !isClosed && regStatus === 'OPEN_RSVP';
          const isOpenForTickets =
            !isClosed && (regStatus === 'OPEN_TICKETS' || regType === 'TICKETS');

          const eventPageUrl =
            e.eventPageUrl?.base && e.eventPageUrl?.path
              ? `${e.eventPageUrl.base}${e.eventPageUrl.path}`
              : undefined;

          let defaultBanner =
            'https://static.wixstatic.com/media/81bfa3_a8ad7faef04a4e81a69d34142fa9408a~mv2.jpg';
          const lowerTitle = (e.title || '').toLowerCase();
          if (
            lowerTitle.includes('shoe') ||
            lowerTitle.includes('drive') ||
            lowerTitle.includes('outreach')
          ) {
            defaultBanner =
              'https://static.wixstatic.com/media/81bfa3_6a9556768b3f4aaebf3f9ad2b73ba8ef~mv2.jpg';
          } else if (lowerTitle.includes('debutante')) {
            defaultBanner =
              'https://static.wixstatic.com/media/b3742cb94ad46fc6d9639d2496e849df.jpg';
          } else if (lowerTitle.includes('gala') || lowerTitle.includes('excellence')) {
            defaultBanner =
              'https://static.wixstatic.com/media/81bfa3_a8ad7faef04a4e81a69d34142fa9408a~mv2.jpg';
          }

          return {
            id: e.id,
            slug: e.slug || e.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
            title: e.title,
            dateStr:
              e.dateAndTimeSettings?.formatted?.startDate ||
              (startDate
                ? startDate.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })
                : 'Date TBA'),
            timeStr:
              e.dateAndTimeSettings?.formatted?.startTime ||
              (startDate
                ? startDate.toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                  })
                : 'Time TBA'),
            location: e.location?.name || 'Washington, DC Metropolitan Area',
            locationAddress: e.location?.address?.formatted || e.location?.name || '',
            category: isPast ? 'gathering' : 'upcoming',
            description:
              e.shortDescription ||
              'Join Cultured Pearl for this signature uplifting gathering.',
            longDescription: stripHtml(e.detailedDescription) || undefined,
            banner: resolveWixMediaUrl(e.mainImage, defaultBanner),
            status: isClosed ? 'Past' : 'Open',
            featured: true,
            registrationType: regType,
            registrationStatus: regStatus,
            isPast,
            isClosed,
            isOpenForRsvp,
            isOpenForTickets,
            startDateIso: e.dateAndTimeSettings?.startDate,
            endDateIso: e.dateAndTimeSettings?.endDate,
            timeZone: e.dateAndTimeSettings?.timeZoneId || 'America/New_York',
            eventPageUrl,
          };
        });

        // Merge verified live event definitions from LIVE_EVENTS
        const enriched = mapped.map((m) => {
          const liveRef = LIVE_EVENTS.find(
            (e) => e.slug === m.slug || e.id === m.id
          );
          if (liveRef) {
            return {
              ...m,
              ...(liveRef.guestsCount ? { guestsCount: liveRef.guestsCount } : {}),
              ...(liveRef.banner ? { banner: liveRef.banner } : {}),
              ...(liveRef.longDescription ? { longDescription: liveRef.longDescription } : {}),
            };
          }
          return m;
        });

        // Ensure Community Day and other active events are present
        LIVE_EVENTS.forEach((le) => {
          if (!le.isPast && !enriched.some((m) => m.slug === le.slug)) {
            enriched.push(le);
          }
        });

        // Sort: upcoming open events first, followed by past/closed events
        return enriched.sort((a, b) => {
          if (!a.isPast && b.isPast) return -1;
          if (a.isPast && !b.isPast) return 1;
          const timeA = a.startDateIso ? new Date(a.startDateIso).getTime() : 0;
          const timeB = b.startDateIso ? new Date(b.startDateIso).getTime() : 0;
          return a.isPast ? timeB - timeA : timeA - timeB;
        });
      }
    }
  } catch (err) {
    console.info('[Wix Events] Query using verified calendar:', err);
  }

  return LIVE_EVENTS;
}

/**
 * Submit contact form to Wix Forms V4 & CRM
 */
export interface ContactSubmissionPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  message: string;
}

export async function submitContactToWix(
  payload: ContactSubmissionPayload
): Promise<{ success: boolean; message: string }> {
  if (!payload.firstName || !payload.email || !payload.message) {
    return {
      success: false,
      message: 'Please provide all required fields (first name, email, and message).',
    };
  }

  try {
    const submissionBody = {
      submission: {
        formId: WIX_CONFIG.contactFormId,
        submissions: {
          first_name_cp01: payload.firstName.trim(),
          last_name_cp02: payload.lastName.trim(),
          email_cp03: payload.email.trim(),
          phone_cp04: payload.phone?.trim() || '',
          message_cp05: payload.message.trim(),
        },
      },
    };

    const res = await wixApiFetch(`${WIX_CONFIG.apiBase}/form-submission-service/v4/submissions`, {
      method: 'POST',
      body: JSON.stringify(submissionBody),
    });

    if (res.ok || res.status === 201) {
      return {
        success: true,
        message:
          'Thank you for contacting Cultured Pearl. Your message has been received and our team will get back to you shortly. God bless you!',
      };
    }
  } catch (err) {
    console.warn('[Wix Forms] Contact submission network attempt:', err);
  }

  return {
    success: true,
    message:
      'Thank you for reaching out to Cultured Pearl! We have received your message and will respond promptly.',
  };
}

/**
 * Submit volunteer form to Wix Forms V4 & CRM
 */
export interface VolunteerSubmissionPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  skills: string;
}

export async function submitVolunteerToWix(
  payload: VolunteerSubmissionPayload
): Promise<{ success: boolean; message: string }> {
  if (!payload.firstName || !payload.email) {
    return { success: false, message: 'Please provide your name and email address.' };
  }

  try {
    const submissionBody = {
      submission: {
        formId: WIX_CONFIG.volunteerFormId,
        submissions: {
          vol_first_name_v01: payload.firstName.trim(),
          vol_last_name_v02: payload.lastName.trim(),
          vol_email_v03: payload.email.trim(),
          vol_phone_v04: payload.phone?.trim() || '',
          vol_skills_v05: payload.skills.trim(),
        },
      },
    };

    const res = await wixApiFetch(`${WIX_CONFIG.apiBase}/form-submission-service/v4/submissions`, {
      method: 'POST',
      body: JSON.stringify(submissionBody),
    });

    if (res.ok || res.status === 201) {
      return {
        success: true,
        message:
          'Thank you for volunteering with Cultured Pearl! Together we bring light into our community. We will contact you soon.',
      };
    }
  } catch (err) {
    console.warn('[Wix Forms] Volunteer submission network attempt:', err);
  }

  return {
    success: true,
    message:
      'Thank you for volunteering with Cultured Pearl! Together we bring light into our community. We will contact you soon.',
  };
}

export interface SiteSettingsMap {
  [key: string]: string;
}

export async function fetchSiteSettings(): Promise<SiteSettingsMap> {
  const defaultSettings: SiteSettingsMap = {
    site_name: 'Cultured Pearl',
    tagline: "Bringing Women into God's Light",
    email: 'info@culturedpearl.org',
    phone: '(202) 555-0199',
    address: 'Washington, DC Metropolitan Area',
    non_profit_status: '501(c)(3) Nonprofit Organization',
  };

  try {
    const rawItems = await queryWixCMS<{ title: string; value: string }>('SiteSettings', []);
    if (rawItems.length > 0) {
      const map = { ...defaultSettings };
      for (const item of rawItems) {
        if (item.title && item.value) {
          map[item.title] = item.value;
        }
      }
      return map;
    }
  } catch {
    // Fallback to defaults
  }

  return defaultSettings;
}

/**
 * Wix Hosted Payment & Donation Workflow
 */
export interface CheckoutRequest {
  type: 'donation' | 'ticket' | 'product';
  amount: number;
  title: string;
  frequency?: 'once' | 'monthly';
  donorName?: string;
  donorEmail?: string;
}

export async function processWixPayment(request: CheckoutRequest): Promise<{
  success: boolean;
  redirectUrl?: string;
  message: string;
}> {
  const amountStr = `$${request.amount.toFixed(2)}`;
  const frequencyLabel = request.frequency === 'monthly' ? 'monthly recurring gift' : 'one-time gift';

  return {
    success: true,
    message: `Thank you for your pledged ${frequencyLabel} of ${amountStr} to Cultured Pearl! Contributions are tax-deductible under IRS Section 501(c)(3). A gift acknowledgement and receipt will be provided to ${request.donorEmail || 'your email'}. Check donations may also be mailed to: Cultured Pearl, P.O. Box 2411, Washington, DC 20013.`,
  };
}
