const fs = require('fs');

async function inspectOriginalSite() {
  try {
    const sitemapRes = await fetch('https://www.culturedpearl.org/pages-sitemap.xml', {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
    });
    if (sitemapRes.ok) {
      const text = await sitemapRes.text();
      const locs = [...text.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);
      console.log('Original Site URLs in Sitemap:');
      locs.forEach(l => console.log(' -', l));
    } else {
      console.log('Sitemap status:', sitemapRes.status);
    }
  } catch(e) {
    console.error('Error fetching sitemap:', e.message);
  }

  // Also check main events page on culturedpearl.org
  try {
    const evPageRes = await fetch('https://www.culturedpearl.org/event-details/pearls-of-excellence-gala-scholarship-awards-2027', {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
    });
    console.log('Gala 2027 status:', evPageRes.status);
    const html = await evPageRes.text();
    // find buttons or text
    const textSnippets = html.match(/RSVP|Ticket|Register|Registration|Checkout|closed/gi);
    console.log('Keywords found on original gala page:', [...new Set(textSnippets)]);
  } catch(e) {
    console.error('Error checking gala 2027:', e.message);
  }
}

inspectOriginalSite().catch(console.error);
