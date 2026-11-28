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

  // Reserve 1 Free ticket
  const reserveRes = await api('POST', '/events/v1/ticket-reservations', {
    ticketReservation: {
      tickets: [
        {
          eventId: 'dd9df97a-a275-408e-8be4-81355752ba1a',
          ticketDefinitionId: '6b13c8cc-95fa-4500-802e-f7c80e55ccdc',
          quantity: 1
        }
      ]
    }
  }, token);
  console.log('Free ticket reservation response:', reserveRes.status, JSON.stringify(reserveRes.data, null, 2));

  const reservationId = reserveRes.data?.ticketReservation?.id;
  if (!reservationId) return;

  const redirectRes = await api('POST', '/headless/v1/redirect-session', {
    eventsCheckout: {
      reservationId: reservationId,
      eventSlug: 'pearls-of-excellence-honoring-women-of-faith-purpose-impact-1'
    },
    callbacks: {
      postFlowUrl: 'https://headless-myhqhhixfom-cmsscaleup-140a.wix-site-host.com/events',
      thankYouPageUrl: 'https://headless-myhqhhixfom-cmsscaleup-140a.wix-site-host.com/event-confirmation'
    }
  }, token);
  console.log('Redirect session response for free ticket:', redirectRes.status, JSON.stringify(redirectRes.data, null, 2));
}

main().catch(console.error);
