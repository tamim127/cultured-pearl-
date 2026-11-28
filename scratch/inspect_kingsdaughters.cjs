const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\bdcalling\\.gemini\\antigravity\\brain\\2a2fb508-9609-4714-ba31-418ab7e429d7';

const url = 'https://www.culturedpearl.org/event-details/kingsdaughters';
const outImg = path.join(artifactDir, 'kingsdaughters_original_page.png');

console.log('Capturing https://www.culturedpearl.org/event-details/kingsdaughters...');
try {
  execSync(`"${chromePath}" --headless=new --disable-gpu --window-size=1280,2600 --virtual-time-budget=8000 --screenshot="${outImg}" "${url}"`, {
    timeout: 35000
  });
  console.log('Saved screenshot:', outImg, fs.statSync(outImg).size, 'bytes');
} catch (e) {
  console.error('Screenshot error:', e.message);
}
