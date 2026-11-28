const fs = require('fs');

async function testHeadlessCheckout() {
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
  console.log('Anonymous token obtained.');

  // Test creating ticket reservation
  const eventId = 'ce9f7432-2ea8-46b3-970b-891c88fadab0';
  console.log('Testing ticket reservation...');
  const resRes = await fetch('https://www.wixapis.com/events/v1/ticket-reservations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    body: JSON.stringify({
      ticketReservation: {
        tickets: []
      }
    })
  });
  console.log('Reservation status:', resRes.status);
  console.log('Reservation body:', await resRes.text());
}

testHeadlessCheckout().catch(console.error);
