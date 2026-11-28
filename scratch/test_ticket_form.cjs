const fs = require('fs');

async function testTicketForm() {
  const url = 'https://www.culturedpearl.org/event-details/pearls-of-excellence-honoring-women-of-faith-purpose-impact/ticket-form';
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  console.log('Ticket form status:', res.status);
  const html = await res.text();
  console.log('HTML length:', html.length);
  // look for tickets JSON
  const idx = html.indexOf('"tickets":');
  if (idx !== -1) {
    console.log(html.substring(idx, idx + 1000));
  }
}

testTicketForm().catch(console.error);
