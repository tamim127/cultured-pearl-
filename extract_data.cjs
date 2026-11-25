const https = require('https');
const fs = require('fs');

function fetch(url) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', () => resolve(''));
  });
}

function decodeEntities(str) {
  return str
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#39;/g, "'")
    .replace(/&rsquo;/g, "'")
    .replace(/&lsquo;/g, "'")
    .replace(/&rdquo;/g, '"')
    .replace(/&ldquo;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

async function run() {
  const pages = [
    'about', 'meet-the-team', 'purposefullifescholarship',
    'debutante', 'get-involved', 'shop', 'gallery', 'videos',
    'contact', 'upcoming-events'
  ];
  const results = {};

  for (const page of pages) {
    console.log('Fetching ' + page + '...');
    const html = await fetch('https://www.culturedpearl.org/' + page);
    
    // Headings
    const headings = [];
    const hRegex = /<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/gi;
    let hm;
    while ((hm = hRegex.exec(html)) !== null) {
      const text = decodeEntities(hm[1]);
      if (text.length > 3 && !headings.includes(text)) headings.push(text);
    }

    // Paragraphs
    const paragraphs = [];
    const pRegex = /<p[^>]*>([\s\S]*?)<\/p>/gi;
    let pm;
    while ((pm = pRegex.exec(html)) !== null) {
      const text = decodeEntities(pm[1]);
      if (text.length > 15 && !paragraphs.includes(text)) paragraphs.push(text);
    }

    // Wix Images
    const imgRegex = /https:\/\/static\.wixstatic\.com\/media\/([a-zA-Z0-9_~.-]+)/g;
    const images = [];
    let im;
    while ((im = imgRegex.exec(html)) !== null) {
      const full = 'https://static.wixstatic.com/media/' + im[1];
      if (!images.includes(full) && !full.includes('.ico') && !full.includes('wix_icon')) {
        images.push(full);
      }
    }

    results[page] = { headings, paragraphs, images };
  }

  // Also fetch events from sitemap
  const sitemap = await fetch('https://www.culturedpearl.org/pages-sitemap.xml');
  const eventUrls = [];
  const locRegex = /<loc>(https:\/\/www\.culturedpearl\.org\/event-details\/[^<]+)<\/loc>/g;
  let lm;
  while ((lm = locRegex.exec(sitemap)) !== null) {
    eventUrls.push(lm[1]);
  }
  console.log('Found event URLs:', eventUrls.length);

  const eventDetails = [];
  for (const eu of eventUrls.slice(0, 15)) {
    const eHtml = await fetch(eu);
    const titleMatch = eHtml.match(/<title>([^<]*)<\/title>/i);
    const title = titleMatch ? titleMatch[1].replace(/ \| Cultured Pearl.*$/, '').trim() : '';
    const imgMatch = eHtml.match(/https:\/\/static\.wixstatic\.com\/media\/([a-zA-Z0-9_~.-]+)/);
    const img = imgMatch ? 'https://static.wixstatic.com/media/' + imgMatch[1] : '';
    const descMatch = eHtml.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i);
    const desc = descMatch ? decodeEntities(descMatch[1]) : '';
    const slug = eu.replace('https://www.culturedpearl.org/event-details/', '');
    eventDetails.push({ slug, title, img, desc, url: eu });
  }
  results['scraped_events'] = eventDetails;

  fs.writeFileSync('detailed_content.json', JSON.stringify(results, null, 2));
  console.log('All detailed content written to detailed_content.json');
}

run();
