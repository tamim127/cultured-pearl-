const fs = require('fs');

async function findOriginalEvent() {
  const url = 'https://www.culturedpearl.org/event-details/pearls-of-excellence-gala-scholarship-awards-2027';
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  const html = await res.text();
  console.log('HTML length:', html.length);
  
  const idx = html.indexOf('lowestPrice');
  if (idx !== -1) {
    console.log('--- Found lowestPrice snippet: ---');
    console.log(html.substring(idx - 400, idx + 1000));
  }

  // Also check if there are other event-details pages on culturedpearl.org:
  const eventDetailUrls = [...html.matchAll(/https:\/\/www\.culturedpearl\.org\/event-details\/[a-zA-Z0-9-]+/g)].map(m => m[0]);
  console.log('Found event-details URLs:', [...new Set(eventDetailUrls)]);
}

findOriginalEvent().catch(console.error);
