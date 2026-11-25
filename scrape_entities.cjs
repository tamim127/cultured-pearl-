const https = require('https');
const fs = require('fs');

function fetch(url) {
  return new Promise(resolve => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', () => resolve(''));
  });
}

function decodeHtml(s) {
  return (s || '')
    .replace(/&amp;/g, '&')
    .replace(/&#39;/g, "'")
    .replace(/&rsquo;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, ' ')
    .trim();
}

async function scrapeAll() {
  const eventsXml = await fetch('https://www.culturedpearl.org/event-pages-sitemap.xml');
  const storeXml = await fetch('https://www.culturedpearl.org/store-products-sitemap.xml');
  const blogXml = await fetch('https://www.culturedpearl.org/blog-posts-sitemap.xml');

  const locRegex = /<loc>([^<]+)<\/loc>/g;
  
  const eventUrls = [];
  let m;
  while ((m = locRegex.exec(eventsXml)) !== null) eventUrls.push(m[1]);

  const productUrls = [];
  locRegex.lastIndex = 0;
  while ((m = locRegex.exec(storeXml)) !== null) productUrls.push(m[1]);

  const blogUrls = [];
  locRegex.lastIndex = 0;
  while ((m = locRegex.exec(blogXml)) !== null) blogUrls.push(m[1]);

  console.log('Events:', eventUrls.length);
  console.log('Products:', productUrls.length);
  console.log('Blogs:', blogUrls.length);

  // Scrape each event details
  const events = [];
  for (const eu of eventUrls) {
    const html = await fetch(eu);
    const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
    const title = titleMatch ? decodeHtml(titleMatch[1].replace(/ \| Cultured Pearl.*$/, '')) : '';
    const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i);
    const desc = descMatch ? decodeHtml(descMatch[1]) : '';
    const imgMatches = html.match(/https:\/\/static\.wixstatic\.com\/media\/[a-zA-Z0-9_~.-]+/g) || [];
    const banner = imgMatches.find(img => !img.includes('.ico') && !img.includes('wix_icon')) || '';
    const slug = eu.replace('https://www.culturedpearl.org/event-details/', '');
    events.push({ title, slug, url: eu, banner, desc });
  }

  // Scrape products
  const products = [];
  for (const pu of productUrls) {
    const html = await fetch(pu);
    const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
    const title = titleMatch ? decodeHtml(titleMatch[1].replace(/ \| Cultured Pearl.*$/, '')) : '';
    const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i);
    const desc = descMatch ? decodeHtml(descMatch[1]) : '';
    const imgMatches = html.match(/https:\/\/static\.wixstatic\.com\/media\/[a-zA-Z0-9_~.-]+/g) || [];
    const img = imgMatches.find(i => !i.includes('.ico') && !i.includes('wix_icon')) || '';
    const slug = pu.replace('https://www.culturedpearl.org/product-page/', '');
    products.push({ title, slug, url: pu, img, desc });
  }

  // Scrape blogs
  const blogs = [];
  for (const bu of blogUrls) {
    const html = await fetch(bu);
    const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
    const title = titleMatch ? decodeHtml(titleMatch[1].replace(/ \| Cultured Pearl.*$/, '')) : '';
    const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i);
    const desc = descMatch ? decodeHtml(descMatch[1]) : '';
    const imgMatches = html.match(/https:\/\/static\.wixstatic\.com\/media\/[a-zA-Z0-9_~.-]+/g) || [];
    const img = imgMatches.find(i => !i.includes('.ico') && !i.includes('wix_icon')) || '';
    const slug = bu.replace('https://www.culturedpearl.org/post/', '');
    blogs.push({ title, slug, url: bu, img, desc });
  }

  fs.writeFileSync('all_live_entities.json', JSON.stringify({ events, products, blogs }, null, 2));
  console.log('Saved all_live_entities.json successfully!');
}

scrapeAll();
