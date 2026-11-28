const fs = require('fs');

async function checkOriginalSiteEvents() {
  const url = 'https://www.culturedpearl.org/pages-sitemap.xml';
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  const text = await res.text();
  const urls = [...text.matchAll(/<loc>(https:\/\/www\.culturedpearl\.org\/event-details\/[^<]+)<\/loc>/g)].map(m => m[1]);
  console.log('All event URLs in sitemap on culturedpearl.org:');
  console.log(urls);

  // Also check upcoming-events page on culturedpearl.org:
  const upRes = await fetch('https://www.culturedpearl.org/upcoming-events', { headers: { 'User-Agent': 'Mozilla/5.0' } });
  const upHtml = await upRes.text();
  const upLinks = [...upHtml.matchAll(/href="([^"]*event-details[^"]*)"/g)].map(m => m[1]);
  console.log('Event links in /upcoming-events:', [...new Set(upLinks)]);

  // Let's inspect each event URL to extract complete data!
  for (const link of [...new Set([...urls, ...upLinks])]) {
    const fullUrl = link.startsWith('http') ? link : 'https://www.culturedpearl.org' + link;
    console.log('--------------------------------------------------');
    console.log('Fetching:', fullUrl);
    try {
      const pageRes = await fetch(fullUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } });
      const pageHtml = await pageRes.text();
      const evMatch = pageHtml.match(/"event":\{"event":(\{[^}]+\})/);
      const titleMatch = pageHtml.match(/"title":"([^"]+)"/);
      const startMatch = pageHtml.match(/"startDateFormatted":"([^"]+)"/);
      const timeMatch = pageHtml.match(/"startTimeFormatted":"([^"]+)"/);
      const imgMatch = pageHtml.match(/"mainImage":\{"id":"([^"]+)"/);
      const gaMatch = pageHtml.match(/"lowestTicketPriceFormatted":"([^"]+)"/);
      const highMatch = pageHtml.match(/"highestTicketPriceFormatted":"([^"]+)"/);
      console.log('Title:', titleMatch ? titleMatch[1] : null);
      console.log('Date:', startMatch ? startMatch[1] : null, timeMatch ? timeMatch[1] : null);
      console.log('Image:', imgMatch ? imgMatch[1] : null);
      console.log('Tickets:', gaMatch ? gaMatch[1] : null, 'to', highMatch ? highMatch[1] : null);
    } catch(e) {
      console.error('Err:', e.message);
    }
  }
}

checkOriginalSiteEvents().catch(console.error);
