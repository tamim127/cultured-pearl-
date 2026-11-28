const fs = require('fs');

async function checkSiteMeta() {
  const url = 'https://www.culturedpearl.org/event-details/pearls-of-excellence-honoring-women-of-faith-purpose-impact';
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  const html = await res.text();

  // Find metaSiteId or instanceId or siteId
  const metaMatch = html.match(/"metaSiteId":"([a-f0-9-]+)"/);
  console.log('metaSiteId:', metaMatch ? metaMatch[1] : null);

  const siteIdMatch = html.match(/"siteId":"([a-f0-9-]+)"/);
  console.log('siteId:', siteIdMatch ? siteIdMatch[1] : null);

  // Find all event JSON
  const eventIdx = html.indexOf('"event":{');
  if (eventIdx !== -1) {
    console.log('Event JSON snippet:');
    console.log(html.substring(eventIdx, eventIdx + 2500));
  } else {
    const evIdx2 = html.indexOf('"eventId":"');
    if (evIdx2 !== -1) {
      console.log('EventId snippet:');
      console.log(html.substring(evIdx2 - 100, evIdx2 + 1500));
    }
  }
}

checkSiteMeta().catch(console.error);
