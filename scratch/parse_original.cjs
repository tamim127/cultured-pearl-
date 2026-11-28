const fs = require('fs');

async function parseOriginalPages() {
  const upRes = await fetch('https://www.culturedpearl.org/upcoming-events', {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
  });
  const upHtml = await upRes.text();
  // Extract all event links
  const eventLinks = [...upHtml.matchAll(/href=[\"']([^\"']*\/event-details\/[^\"']*)[\"']/gi)].map(m => m[1]);
  console.log('Event links in upcoming-events page:', [...new Set(eventLinks)]);

  // Check detail page
  const detailRes = await fetch('https://www.culturedpearl.org/event-details/pearls-of-excellence-gala-scholarship-awards-2027', {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
  });
  const detailHtml = await detailRes.text();
  console.log('Detail page size:', detailHtml.length);
  // Look for any wix events configuration or state
  const stateMatches = detailHtml.match(/\"registration\":\{[^\}]+\}/g);
  if (stateMatches) {
    console.log('Registration states:', stateMatches.slice(0, 5));
  }
  const ticketMatches = detailHtml.match(/\"ticket[^\"]*\":\{[^\}]+\}/gi);
  if (ticketMatches) {
    console.log('Ticket states:', ticketMatches.slice(0, 5));
  }
}

parseOriginalPages().catch(console.error);
