const fs = require('fs');

async function extractFullEvents() {
  const urls = [
    'https://www.culturedpearl.org/event-details/pearls-of-excellence-honoring-women-of-faith-purpose-impact',
    'https://www.culturedpearl.org/event-details/community-day'
  ];

  for (const url of urls) {
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    const html = await res.text();
    console.log('================================================================');
    console.log('URL:', url);
    // Find the event object
    const startIdx = html.indexOf('"event":{"id":');
    if (startIdx !== -1) {
      // Find matching brace or slice a good chunk
      console.log(html.substring(startIdx, startIdx + 3000));
    } else {
      const idx2 = html.indexOf('{"event":{"event":');
      if (idx2 !== -1) {
        console.log(html.substring(idx2, idx2 + 3000));
      }
    }
  }
}

extractFullEvents().catch(console.error);
