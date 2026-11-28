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
  // 1. Get visitor token
  const tokenRes = await api('POST', '/oauth2/token', {
    clientId: CLIENT_ID,
    grantType: 'anonymous'
  });
  console.log('Visitor token status:', tokenRes.status);
  const token = tokenRes.data?.access_token;
  if (!token) {
    console.error('Failed to get token:', tokenRes);
    return;
  }

  // 2. Query available ticket definitions for all events on the site
  const eventsRes = await api('POST', '/events/v3/events/query', {
    query: { paging: { limit: 10 } }
  }, token);
  console.log('Events on site:', (eventsRes.data?.events || []).map(e => ({ id: e.id, title: e.title, status: e.status })));

  for (const ev of (eventsRes.data?.events || [])) {
    const tiersRes = await api('POST', '/events/v3/ticket-definitions/available/query', {
      query: { filter: { eventId: ev.id } }
    }, token);
    console.log(`Tiers for ${ev.title} (${ev.id}):`, tiersRes.status, tiersRes.data);
  }

  // 3. Test headless redirect session API
  const redirectTest = await api('POST', '/headless/v1/redirect-session', {
    callbacks: {
      postFlowUrl: 'https://headless-myhqhhixfom-cmsscaleup-140a.wix-site-host.com/events',
      thankYouPageUrl: 'https://headless-myhqhhixfom-cmsscaleup-140a.wix-site-host.com/event-confirmation'
    }
  }, token);
  console.log('Redirect test status:', redirectTest.status, redirectTest.data);
}

main().catch(console.error);
