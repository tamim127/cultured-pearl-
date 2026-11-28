const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\bdcalling\\.gemini\\antigravity\\brain\\2a2fb508-9609-4714-ba31-418ab7e429d7';

const url = 'https://headless-myhqhhixfom-cmsscaleup-140a.wix-site-host.com/#/events/pearls-of-excellence-honoring-women-of-faith-purpose-impact';
const outPath = path.join(artifactDir, 'live_headless_checkout_modal.png');

console.log('Capturing page state...');
execSync(`"${chromePath}" --headless=new --disable-gpu --window-size=1280,1400 --virtual-time-budget=6000 --screenshot="${outPath}" "${url}"`, {
  timeout: 25000
});

console.log('Saved:', outPath, fs.statSync(outPath).size, 'bytes');
