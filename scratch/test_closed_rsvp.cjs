const fs = require('fs');

async function testClosedEventRSVP() {
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

  // Closed event: Pearls of Excellence Gala 2026
  const closedEventId = '64d36fbc-2c3c-458f-93eb-edffe6ffbca5';
  const rsvpRes = await fetch('https://www.wixapis.com/events/v2/rsvps', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    body: JSON.stringify({
      rsvp: {
        eventId: closedEventId,
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane.doe@example.com',
        status: 'YES'
      }
    })
  });
  console.log('Closed event RSVP status:', rsvpRes.status);
  const body = await rsvpRes.json();
  console.log('Closed event RSVP body:', JSON.stringify(body, null, 2));
}

testClosedEventRSVP().catch(console.error);
