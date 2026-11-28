const fs = require('fs');

async function inspectEventImpact() {
  const url = 'https://www.culturedpearl.org/event-details/pearls-of-excellence-honoring-women-of-faith-purpose-impact';
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  console.log('Status:', res.status);
  const html = await res.text();
  console.log('Length:', html.length);

  // Look for tickets or definitions
  const ticketDefsIdx = html.indexOf('definitions');
  if (ticketDefsIdx !== -1) {
    console.log('definitions snippet:');
    console.log(html.substring(ticketDefsIdx - 100, ticketDefsIdx + 1200));
  }

  // Look for General Admission and VIP Ticket
  const gaIdx = html.indexOf('General Admission');
  if (gaIdx !== -1) {
    console.log('General Admission snippet:');
    console.log(html.substring(gaIdx - 200, gaIdx + 800));
  }

  // Look for event ID
  const idMatch = html.match(/"id":"([a-f0-9-]{36})"/);
  console.log('Event ID matched:', idMatch ? idMatch[1] : null);

  // Look for title
  const titleMatch = html.match(/"title":"([^"]+)"/);
  console.log('Title matched:', titleMatch ? titleMatch[1] : null);

  // Look for main image
  const imgMatches = html.match(/https:\/\/static\.wixstatic\.com\/media\/[^"]+/g);
  console.log('Images in event:', [...new Set(imgMatches)].slice(0, 10));
}

inspectEventImpact().catch(console.error);
