const fs = require('fs');

async function verifyLive() {
  const res = await fetch('https://headless-myhqhhixfom-cmsscaleup-140a.wix-site-host.com/');
  console.log('Live host status:', res.status);
  const text = await res.text();
  console.log('HTML size:', text.length);

  // Check events bundle
  const bundleMatches = [...text.matchAll(/src="(\/assets\/[^"]+)"/g)].map(m => m[1]);
  console.log('Script bundles found:', bundleMatches);
  for (const b of bundleMatches) {
    const bRes = await fetch('https://headless-myhqhhixfom-cmsscaleup-140a.wix-site-host.com' + b);
    console.log(b, 'status:', bRes.status);
  }
}

verifyLive().catch(console.error);
