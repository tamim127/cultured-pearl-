const https = require('https');

const SITE_ID = '6f7426b7-afd2-4e14-84db-49d2395b4ee7';
const CLIENT_ID = 'ce53d5c9-71bf-455a-998b-006434e70ebd';

function api(method, path, body, token) {
  return new Promise((resolve, reject) => {
    const payload = body ? JSON.stringify(body) : null;
    const req = https.request({
      hostname: 'www.wixapis.com',
      port: 443,
      path,
      method,
      headers: {
        'Content-Type': 'application/json',
        'wix-site-id': SITE_ID,
        ...(token ? { 'Authorization': token } : {}),
        ...(payload ? { 'Content-Length': Buffer.byteLength(payload) } : {})
      }
    }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(data) });
        } catch (e) {
          resolve({ status: res.statusCode, raw: data });
        }
      });
    });
    req.on('error', reject);
    if (payload) req.write(payload);
    req.end();
  });
}

async function main() {
  const tokenRes = await api('POST', '/oauth2/token', {
    clientId: CLIENT_ID,
    grantType: 'anonymous'
  });
  const token = tokenRes.data?.access_token;

  // Let's check event details for 'deb3d302-f9be-4afa-a8ee-1878d1db98bc'
  const evRes = await api('GET', '/events/v3/events/deb3d302-f9be-4afa-a8ee-1878d1db98bc', null, token);
  console.log('Event deb3d302 details:', evRes.status, evRes.data?.event?.registration);

  // Let's check event ce9f7432 (Gala 2027)
  const galaRes = await api('GET', '/events/v3/events/ce9f7432-2ea8-46b3-970b-891c88fadab0', null, token);
  console.log('Event ce9f7432 details:', galaRes.status, galaRes.data?.event?.registration);

  // Let's test ticket-reservations endpoint
  const resTest = await api('POST', '/events/v1/ticket-reservations', {
    ticketReservation: {
      tickets: [
        {
          eventId: 'deb3d302-f9be-4afa-a8ee-1878d1db98bc',
          ticketDefinitionId: '00000000-0000-0000-0000-000000000000',
          quantity: 1
        }
      ]
    }
  }, token);
  console.log('Reservation test:', resTest.status, resTest.data);
}

main().catch(console.error);
