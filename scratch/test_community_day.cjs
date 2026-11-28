const fs = require('fs');

async function testCommunityDay() {
  const url = 'https://www.culturedpearl.org/event-details/community-day';
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  console.log('Community Day status:', res.status);
  const html = await res.text();
  const idx = html.indexOf('"tickets":');
  if (idx !== -1) {
    console.log(html.substring(idx, idx + 1000));
  }
}

testCommunityDay().catch(console.error);
