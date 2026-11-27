import React, { useState, useEffect, useCallback } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Section } from '@/components/Section';
import { Eyebrow } from '@/components/Eyebrow';
import { Button } from '@/components/Button';
import { IMAGES } from '@/constants/images';
import {
  fetchWixEvents,
  fetchTestimonials,
  fetchHomePageContent,
  useWixLiveRefresh,
  TestimonialItem,
  HomePageContent,
} from '@/services/wixClient';
import { LiveEvent } from '@/data/eventsData';

const pillars = [
  {
    n: '01',
    title: 'Teaching',
    body: 'Seminars grounded in scripture that meet real life — finances, time, home, calling and the women of the Bible.',
  },
  {
    n: '02',
    title: 'Sisterhood',
    body: 'Circles where women are known by name, prayed for by name, and carried through whatever season they are in.',
  },
  {
    n: '03',
    title: 'Outreach',
    body: 'Community days, care drives and the Purposeful Life Scholarship — small acts, gathered into something larger.',
  },
];

export function Home() {
  const [events, setEvents] = useState<LiveEvent[]>([]);
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [homeContent, setHomeContent] = useState<HomePageContent>({
    heroEyebrow: 'SINCE 2017 · 501(C)(3) NONPROFIT',
    heroTitle: "Bringing women into God's light.",
    heroSubtitle: 'Embracing, encouraging and celebrating sisterhood — through teaching, presence, prayer, and selfless service.',
    primaryButtonLabel: 'OUR STORY',
    primaryButtonUrl: '/about',
    secondaryButtonLabel: 'UPCOMING EVENTS',
    secondaryButtonUrl: '/events',
    scriptureVerse: "Zechariah 13:9 — 'And I will put this third into the fire, and refine them as one refines silver, and test them as gold is tested. They will call upon my name, and I will answer them. I will say, They are my people; and they will say, The Lord is my God.'",
    aboutSnippetTitle: 'A Sisterhood Rooted in Grace & Service',
    aboutSnippetBody: "Cultured Pearl was founded in 2017 with a sacred calling: to bring women into God's light, walk beside them through seasons of transition, and equip young women with spiritual grounding and educational opportunity.",
  });

  const loadHome = useCallback(() => {
    fetchHomePageContent().then(setHomeContent);
    fetchWixEvents().then((evts) => {
      setEvents(evts.slice(0, 3));
    });
    fetchTestimonials().then((tests) => {
      setTestimonials(tests);
    });
  }, []);

  useEffect(() => {
    loadHome();
  }, [loadHome]);

  useWixLiveRefresh(loadHome);

  const heroTitleText = homeContent.heroTitle || "Bringing women into God's light.";
  const splitHeroLight = heroTitleText.includes("God's light.");

  return (
    <>
      {/* Hero Section */}
      <section className="relative flex min-h-[100svh] items-end overflow-hidden">
        <img
          src={homeContent.heroImage || IMAGES.heroWomen}
          alt="Women of Cultured Pearl gathered in conversation and prayer"
          width={1600}
          height={1200}
          className="absolute inset-0 size-full object-cover"
        />
        <div className="veil absolute inset-0" />
        <div className="relative mx-auto w-full max-w-6xl px-6 pb-24 md:px-10 md:pb-32">
          <p className="eyebrow text-pearl/70">{homeContent.heroEyebrow}</p>
          <h1 className="mt-6 max-w-4xl text-[3.25rem] leading-[0.98] text-pearl md:text-[6.5rem] font-display">
            {splitHeroLight ? (
              <>
                {heroTitleText.replace("God's light.", '').trim()}{' '}
                <em className="block text-gold-soft font-normal">God's light.</em>
              </>
            ) : (
              heroTitleText
            )}
          </h1>
          <p className="mt-8 max-w-md text-base leading-relaxed text-pearl/75">
            {homeContent.heroSubtitle}
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button to={homeContent.primaryButtonUrl || '/about'} variant="gold">
              {homeContent.primaryButtonLabel || 'Our story'}
            </Button>
            <Button to={homeContent.secondaryButtonUrl || '/events'} variant="ghostLight">
              {homeContent.secondaryButtonLabel || 'Upcoming events'}
            </Button>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <Section className="bg-background">
        <div className="grid gap-16 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-5">
            <Eyebrow>Who we are</Eyebrow>
            <h2 className="rule-gold mt-6 text-4xl leading-tight md:text-5xl font-display">
              {homeContent.aboutSnippetTitle || 'A pearl is formed under pressure, on purpose.'}
            </h2>
          </div>
          <div className="space-y-6 text-base leading-relaxed text-muted-foreground md:col-span-6 md:col-start-7">
            <p>
              {homeContent.aboutSnippetBody ||
                'A cultured pearl is grown by a farmer under conditions he controls. In the same way, God allows the seasons of our lives — the good and the hard alike — to shape us into something luminous.'}
            </p>
            <p>
              Since our founding in 2017 we have been determined to make an impact. The core of our effort is simple: give to women. We bring fresh ideas and steady conviction to everything we're part of.
            </p>
            <div>
              <Link
                to="/about"
                className="group inline-flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-foreground transition-colors hover:text-gold"
              >
                Read our story
                <ArrowRight className="size-4 text-gold transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* Our Name (Scripture) */}
      <Section className="bg-sand">
        <div className="grid items-center gap-14 md:grid-cols-2 md:gap-20">
          <img
            src={homeContent.pearlImage || IMAGES.pearl}
            alt="A single pearl resting inside an open oyster shell"
            width={1200}
            height={1200}
            loading="lazy"
            className="aspect-square w-full object-cover"
          />
          <div>
            <Eyebrow>Our foundation</Eyebrow>
            <blockquote className="mt-8 font-display text-3xl leading-[1.25] md:text-[2.6rem]">
              {homeContent.scriptureVerse ||
                '“She is clothed with strength and dignity, and she laughs without fear of the future.”'}
            </blockquote>
            <p className="mt-8 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-gold">
              Scripture Foundation
            </p>
          </div>
        </div>
      </Section>

      {/* What We Do */}
      <Section className="bg-background">
        <Eyebrow>What we do</Eyebrow>
        <div className="mt-14 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-3">
          {pillars.map((item) => (
            <article key={item.n} className="bg-background p-10">
              <span className="font-display text-2xl text-gold">{item.n}</span>
              <h3 className="mt-6 text-2xl font-display">{item.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </Section>

      {/* Live Wix Events Gather With Us */}
      <Section className="bg-espresso text-pearl">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow text-pearl/60">Gather with us · Wix Events</p>
            <h2 className="mt-6 text-4xl md:text-5xl font-display">Upcoming Gatherings</h2>
          </div>
          <Button to="/events" variant="ghostLight">
            View all {events.length > 0 ? `(${events.length})` : ''} events
          </Button>
        </div>
        <ul className="mt-14 divide-y divide-pearl/15 border-y border-pearl/15">
          {events.map((item) => (
            <li key={item.id}>
              <Link
                to={`/events/${item.slug}`}
                className="group flex flex-col gap-2 py-8 transition-colors sm:flex-row sm:items-baseline sm:justify-between"
              >
                <span className="font-display text-3xl transition-colors group-hover:text-gold-soft md:text-4xl">
                  {item.title}
                </span>
                <span className="flex gap-8 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-pearl/60">
                  <span>{item.dateStr}</span>
                  <span>{item.location}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {/* Dynamic Wix CMS Testimonials */}
      {testimonials.length > 0 && (
        <Section className="bg-sand/40">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <Eyebrow>Community Voices · Wix CMS</Eyebrow>
            <h2 className="mt-4 font-serif text-3xl md:text-4xl text-espresso font-bold">
              Echoes of Grace & Impact
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((test) => (
              <div
                key={test.id}
                className="bg-pearl p-8 rounded-2xl border border-sand shadow-soft flex flex-col justify-between"
              >
                <p className="font-serif italic text-espresso/80 text-sm leading-relaxed mb-6">
                  &ldquo;{test.quote}&rdquo;
                </p>
                <div className="flex items-center gap-4 pt-4 border-t border-sand/60">
                  {test.image && (
                    <img
                      src={test.image}
                      alt={test.name}
                      className="w-10 h-10 rounded-full object-cover border border-gold"
                    />
                  )}
                  <div>
                    <h3 className="font-serif font-bold text-espresso text-sm">{test.name}</h3>
                    <p className="text-xs text-gold font-sans uppercase tracking-wider">{test.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Collective Action Banner */}
      <section className="relative overflow-hidden">
        <img
          src={homeContent.communityImage || IMAGES.community}
          alt="Volunteers handing out care packages at a community day"
          width={1600}
          height={900}
          loading="lazy"
          className="absolute inset-0 size-full object-cover"
        />
        <div className="veil absolute inset-0" />
        <div className="relative mx-auto w-full max-w-6xl px-6 py-32 md:px-10 md:py-44">
          <h2 className="max-w-2xl text-4xl leading-tight text-pearl md:text-6xl font-display">
            One action changes a life. Collective action changes a community.
          </h2>
          <div className="mt-10">
            <Button to="/give" variant="gold">
              Support the work
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
