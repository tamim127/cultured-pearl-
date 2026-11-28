const { execSync } = require('child_process');
const path = require('path');
const http = require('http');

// Simple script to test the checkout call directly via our API function
const https = require('https');
const SITE_ID = '6f7426b7-afd2-4e14-84db-49d2395b4ee7';
const CLIENT_ID = 'ce53d5c9-71bf-455a-998b-006434e70ebd';

function api(method, p, body, token) {
  return new Promise((resolve, reject) => {
    const payload = body ? JSON.stringify(body) : null;
    const req = https.request({
      hostname: 'www.wixapis.com',
      port: 443,
      path: p,
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

async function verify() {
  const tokenRes = await api('POST', '/oauth2/token', {
    clientId: CLIENT_ID,
    grantType: 'anonymous'
  });
  const token = tokenRes.data?.access_token;
  console.log('✓ Token acquired');

  // Verify query of available tickets
  const tiersRes = await api('POST', '/events/v3/ticket-definitions/available/query', {
    query: { filter: { eventId: 'dd9df97a-a275-408e-8be4-81355752ba1a' } }
  }, token);
  console.log('✓ Available ticket definitions count:', tiersRes.data?.ticketDefinitions?.length);
  tiersRes.data?.ticketDefinitions?.forEach(t => {
    console.log(`  • ${t.name}: $${t.pricingMethod?.fixedPrice?.value} (${t.feeType})`);
  });

  // Verify redirect session creation for free ticket hold
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

  const reservationId = reserveRes.data?.ticketReservation?.id;
  console.log('✓ Real ticket hold created in Wix Events, ID:', reservationId);

  const redirectRes = await api('POST', '/headless/v1/redirect-session', {
    eventsCheckout: {
      reservationId,
      eventSlug: 'pearls-of-excellence-honoring-women-of-faith-purpose-impact-1'
    },
    callbacks: {
      postFlowUrl: 'https://headless-myhqhhixfom-cmsscaleup-140a.wix-site-host.com/events/pearls-of-excellence-honoring-women-of-faith-purpose-impact',
      thankYouPageUrl: 'https://headless-myhqhhixfom-cmsscaleup-140a.wix-site-host.com/event-confirmation.html'
    }
  }, token);

  console.log('✓ Real Wix Redirect Session URL generated:', redirectRes.data?.redirectSession?.fullUrl ? 'YES' : 'NO');
  console.log('  URL Host:', new URL(redirectRes.data?.redirectSession?.fullUrl).hostname);
}

verify().catch(console.error);
