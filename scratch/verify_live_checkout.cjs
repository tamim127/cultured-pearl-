const puppeteer = require('puppeteer');
const path = require('path');

async function testCheckout() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  console.log('Navigating to live event detail page...');
  await page.goto(
    'https://headless-myhqhhixfom-cmsscaleup-140a.wix-site-host.com/events/pearls-of-excellence-honoring-women-of-faith-purpose-impact',
    { waitUntil: 'networkidle2', timeout: 30000 }
  );

  await new Promise(r => setTimeout(r, 2000));

  // Take screenshot of tickets table
  const artifactPath = path.resolve(
    'C:/Users/bdcalling/.gemini/antigravity/brain/2a2fb508-9609-4714-ba31-418ab7e429d7/live_headless_tickets_table.png'
  );
  await page.screenshot({ path: artifactPath, fullPage: true });
  console.log('Saved screenshot to:', artifactPath);

  // Check what tickets are on page
  const pageText = await page.evaluate(() => document.body.innerText);
  console.log('Includes General Admission:', pageText.includes('General Admission'));
  console.log('Includes VIP Ticket:', pageText.includes('VIP Ticket'));
  console.log('Includes Complimentary Pass:', pageText.includes('Complimentary Pass'));

  // Test selecting a paid ticket and clicking checkout to verify payment notice or redirect
  console.log('Selecting 1 General Admission ticket...');
  await page.evaluate(() => {
    const selects = document.querySelectorAll('select');
    if (selects.length > 0) {
      selects[0].value = '1';
      selects[0].dispatchEvent(new Event('change', { bubbles: true }));
    }
  });

  await new Promise(r => setTimeout(r, 1000));

  console.log('Clicking Checkout...');
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const checkoutBtn = buttons.find(b => b.innerText.includes('Checkout'));
    if (checkoutBtn) checkoutBtn.click();
  });

  await new Promise(r => setTimeout(r, 4000));

  const afterClickUrl = page.url();
  console.log('URL after checkout click:', afterClickUrl);

  const afterClickText = await page.evaluate(() => document.body.innerText);
  console.log('Notice or page text snippet:', afterClickText.slice(0, 500));

  const afterClickScreenshot = path.resolve(
    'C:/Users/bdcalling/.gemini/antigravity/brain/2a2fb508-9609-4714-ba31-418ab7e429d7/live_headless_checkout_action.png'
  );
  await page.screenshot({ path: afterClickScreenshot, fullPage: true });
  console.log('Saved checkout action screenshot to:', afterClickScreenshot);

  await browser.close();
}

testCheckout().catch(console.error);
