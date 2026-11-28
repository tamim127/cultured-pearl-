const fs = require('fs');

async function checkSiteQuery() {
  // Let's see what happens if we query events with site context
  const res = await fetch('https://www.culturedpearl.org/_api/v2/dynamicmodel', {
    headers: { 'User-Agent': 'Mozilla/5.0' }
  });
  console.log('dynamicmodel status:', res.status);

  // Let's check ticket details for pearls-of-excellence-honoring-women-of-faith-purpose-impact
  const pageRes = await fetch('https://www.culturedpearl.org/event-details/pearls-of-excellence-honoring-women-of-faith-purpose-impact', {
    headers: { 'User-Agent': 'Mozilla/5.0' }
  });
  const html = await pageRes.text();
  
  // Extract all ticket definitions from the HTML
  const ticketDefsMatch = html.match(/"ticketDefinitions":(\[[^\]]+\])/);
  if (ticketDefsMatch) {
    console.log('ticketDefinitions:', ticketDefsMatch[1]);
  } else {
    // Find all occurrences of General Admission and VIP Ticket definitions
    const idx = html.indexOf('"name":"General Admission"');
    if (idx !== -1) {
      console.log('GA definition:', html.substring(idx - 100, idx + 400));
    }
    const idxVip = html.indexOf('"name":"VIP Ticket"');
    if (idxVip !== -1) {
      console.log('VIP definition:', html.substring(idxVip - 100, idxVip + 400));
    }
  }
}

checkSiteQuery().catch(console.error);
