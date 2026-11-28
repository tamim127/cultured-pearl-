const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');

async function testCDP() {
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=9222',
    '--disable-gpu',
    'https://headless-myhqhhixfom-cmsscaleup-140a.wix-site-host.com/#/events/pearls-of-excellence-honoring-women-of-faith-purpose-impact'
  ]);

  await new Promise(r => setTimeout(r, 4000));

  try {
    const listRes = await fetch('http://127.0.0.1:9222/json');
    const tabs = await listRes.json();
    console.log('Opened tabs:', tabs.length);
    const target = tabs[0];
    if (!target) throw new Error('No target tab found');
    console.log('Target URL:', target.url);
  } finally {
    chrome.kill();
  }
}

testCDP().catch(e => console.error(e.message));
