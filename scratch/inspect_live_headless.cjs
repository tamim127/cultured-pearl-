const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\bdcalling\\.gemini\\antigravity\\brain\\2a2fb508-9609-4714-ba31-418ab7e429d7';

const url = 'https://headless-myhqhhixfom-cmsscaleup-140a.wix-site-host.com/#/events/kingsdaughters';
const outImg = path.join(artifactDir, 'live_kingsdaughters_headless.png');

console.log('Capturing headless site:', url);
try {
  execSync(`"${chromePath}" --headless=new --disable-gpu --window-size=1280,2400 --virtual-time-budget=8000 --screenshot="${outImg}" "${url}"`, {
    timeout: 35000,
    stdio: 'inherit'
  });
  if (fs.existsSync(outImg)) {
    console.log('Saved screenshot successfully:', outImg, fs.statSync(outImg).size, 'bytes');
  } else {
    console.log('File does not exist after run');
  }
} catch (e) {
  console.error('Screenshot error:', e.message);
}
