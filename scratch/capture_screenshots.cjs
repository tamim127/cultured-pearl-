const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\bdcalling\\.gemini\\antigravity\\brain\\2a2fb508-9609-4714-ba31-418ab7e429d7';

// 1. Capture event detail with live tickets
const eventUrl = 'https://headless-myhqhhixfom-cmsscaleup-140a.wix-site-host.com/#/events/pearls-of-excellence-honoring-women-of-faith-purpose-impact';
const eventImg = path.join(artifactDir, 'live_updated_event_tickets.png');

console.log('Capturing event detail page...');
execSync(`"${chromePath}" --headless=new --disable-gpu --window-size=1280,2400 --virtual-time-budget=7000 --screenshot="${eventImg}" "${eventUrl}"`, {
  timeout: 30000
});
console.log('Saved event page screenshot:', eventImg, fs.statSync(eventImg).size, 'bytes');

// 2. Capture post-checkout confirmation page
const confirmUrl = 'https://headless-myhqhhixfom-cmsscaleup-140a.wix-site-host.com/event-confirmation.html?orderNumber=WIX-748921&eventId=dd9df97a-a275-408e-8be4-81355752ba1a';
const confirmImg = path.join(artifactDir, 'live_event_confirmation_page.png');

console.log('Capturing confirmation page...');
execSync(`"${chromePath}" --headless=new --disable-gpu --window-size=1280,1400 --virtual-time-budget=7000 --screenshot="${confirmImg}" "${confirmUrl}"`, {
  timeout: 30000
});
console.log('Saved confirmation page screenshot:', confirmImg, fs.statSync(confirmImg).size, 'bytes');
