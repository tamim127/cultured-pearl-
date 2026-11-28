const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\bdcalling\\.gemini\\antigravity\\brain\\2a2fb508-9609-4714-ba31-418ab7e429d7';

const homeUrl = 'https://headless-myhqhhixfom-cmsscaleup-140a.wix-site-host.com/';
const modalImg = path.join(artifactDir, 'live_welcome_modal_popup.png');

console.log('Capturing welcome modal on live site...');
// Allow 4 seconds for page load + modal timer trigger
execSync(`"${chromePath}" --headless=new --disable-gpu --window-size=1280,1000 --virtual-time-budget=4000 --screenshot="${modalImg}" "${homeUrl}"`, {
  timeout: 25000
});
console.log('Saved welcome modal screenshot:', modalImg, fs.statSync(modalImg).size, 'bytes');
