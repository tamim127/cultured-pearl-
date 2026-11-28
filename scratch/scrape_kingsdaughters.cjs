const https = require('https');

https.get('https://www.culturedpearl.org/event-details/kingsdaughters', res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    // Look for image urls and event schema
    const imgMatches = data.match(/https:\/\/static\.wixstatic\.com\/media\/[^"'\s]+/g) || [];
    console.log('Images found:', Array.from(new Set(imgMatches)).slice(0, 10));

    // Look for guest list / total guests count
    const guestMatches = data.match(/.{0,50}(?:guests|other guests|Guest).{0,50}/gi) || [];
    console.log('Guest text matches:', guestMatches.slice(0, 10));
  });
});
