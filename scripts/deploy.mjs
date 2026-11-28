import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const SITE_ID = '6f7426b7-afd2-4e14-84db-49d2395b4ee7';
const DIST_DIR = path.resolve('dist');

async function main() {
  console.log('🚀 [1/3] Building website with `npm run build`...');
  execSync('npm run build', { stdio: 'inherit' });

  if (!fs.existsSync(DIST_DIR)) {
    throw new Error('❌ Build directory `dist` does not exist!');
  }

  console.log('🔑 [2/3] Authenticating with Wix CLI...');
  let token = process.env.WIX_ACCESS_TOKEN;
  if (!token) {
    try {
      token = execSync('npx @wix/cli@latest token', { encoding: 'utf8' }).trim();
    } catch {
      try {
        token = execSync('wix token', { encoding: 'utf8' }).trim();
      } catch {
        // Fallback prompt
      }
    }
  }

  if (!token) {
    console.error('❌ Could not retrieve Wix access token.');
    console.error('👉 Please log in once by running: npx @wix/cli@latest login');
    process.exit(1);
  }

  console.log('📦 [3/3] Uploading & releasing files to Wix Headless hosting...');
  
  const formData = new FormData();

  function addFilesRecursively(dir, relPrefix = '') {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relPath = relPrefix ? `${relPrefix}/${entry.name}` : entry.name;
      if (entry.isDirectory()) {
        addFilesRecursively(fullPath, relPath);
      } else {
        const fileBytes = fs.readFileSync(fullPath);
        const blob = new Blob([fileBytes]);
        // Form field name must be "files", with the site-relative path as filename
        formData.append('files', blob, relPath);
      }
    }
  }

  addFilesRecursively(DIST_DIR);

  const url = `https://www.wixapis.com/headless-business-setup/v1/headless-business/${SITE_ID}/drop?campaign=cli&agent=npm-run-release`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: formData
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`❌ Upload failed with status ${response.status}:`, errorText);
    if (response.status === 401 || response.status === 403) {
      console.error('👉 Your Wix login session may have expired. Run: npx @wix/cli@latest login');
    }
    process.exit(1);
  }

  const result = await response.json();
  console.log('\n✨ Deployment Successful!');
  console.log(`🌐 Live URL:  ${result.siteUrl || `https://headless-myhqhhixfom-cmsscaleup-140a.wix-site-host.com`}`);
  console.log(`📊 Dashboard: https://manage.wix.com/dashboard/${SITE_ID}`);
  console.log(`🆔 Upload ID: ${result.uploadId || 'N/A'}\n`);
}

main().catch((err) => {
  console.error('❌ Unexpected error during release:', err);
  process.exit(1);
});
