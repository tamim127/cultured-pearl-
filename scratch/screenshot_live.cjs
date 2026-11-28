const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\bdcalling\\.gemini\\antigravity\\brain\\2a2fb508-9609-4714-ba31-418ab7e429d7';

const pages = [
  {
    name: 'live_events_page_updated.png',
    url: 'https://headless-myhqhhixfom-cmsscaleup-140a.wix-site-host.com/#/events'
  },
  {
    name: 'live_pearls_of_excellence_tickets.png',
    url: 'https://headless-myhqhhixfom-cmsscaleup-140a.wix-site-host.com/#/events/pearls-of-excellence-honoring-women-of-faith-purpose-impact'
  },
  {
    name: 'live_community_day.png',
    url: 'https://headless-myhqhhixfom-cmsscaleup-140a.wix-site-host.com/#/events/community-day'
  }
];

for (const p of pages) {
  const outPath = path.join(artifactDir, p.name);
  console.log(`Capturing ${p.url} -> ${outPath}...`);
  try {
    execSync(`"${chromePath}" --headless=new --disable-gpu --window-size=1280,1400 --virtual-time-budget=6000 --screenshot="${outPath}" "${p.url}"`, {
      timeout: 25000
    });
    console.log(`Saved: ${outPath} (${fs.statSync(outPath).size} bytes)`);
  } catch (err) {
    console.error(`Error capturing ${p.name}:`, err.message);
  }
}
