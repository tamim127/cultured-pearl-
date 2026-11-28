const fs = require('fs');

async function testWixCRMAndEvents() {
  const tokenRes = await fetch('https://www.wixapis.com/oauth2/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      grant_type: 'anonymous',
      client_id: 'ce53d5c9-71bf-455a-998b-006434e70ebd'
    })
  });
  const tokenData = await tokenRes.json();
  const token = tokenData.access_token;

  // Check what happens when an event is ticketed vs RSVP:
  // In Wix Events:
  // When an event has tickets (paid or free tickets), registration.type === 'TICKETS'.
  // If an event has tickets, how does ticket reservation / checkout work in Wix Headless?
  // Let's check Wix Events v1 checkout endpoints:
  // POST https://www.wixapis.com/events/v1/checkout/reservations
  // POST https://www.wixapis.com/events/v1/checkout/orders
  // Or Wix Cashier redirect!
  
  // Let's also check upcoming-events on culturedpearl.org:
  const upRes = await fetch('https://www.culturedpearl.org/upcoming-events', {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
  });
  console.log('Upcoming events page on culturedpearl.org status:', upRes.status);
  const upHtml = await upRes.text();
  console.log('Length:', upHtml.length);
  // Look for event titles or widgets in upcoming-events
  const titles = upHtml.match(/Pearls of Excellence|Debutante|Shoe Drive/g);
  console.log('Event matches on upcoming-events page:', [...new Set(titles)]);
}

testWixCRMAndEvents().catch(console.error);
