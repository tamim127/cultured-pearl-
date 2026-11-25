const fs = require('fs');
const path = require('path');

const distDir = 'd:/Wix/cultured-pearl/dist';

function getFileSection(relPath) {
  const fullPath = path.join(distDir, relPath);
  const data = fs.readFileSync(fullPath, 'utf8');
  return `=== FILE: ${relPath} ===\n${data}\n`;
}

const indexHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');
const assetFiles = fs.readdirSync(path.join(distDir, 'assets')).filter(f => f.endsWith('.js') || f.endsWith('.css'));

// Batch 1: index.html, 404.html, CSS, app JS chunks, router, icons, images, pages
const batch1Files = assetFiles.filter(f => !f.startsWith('vendor-react') && !f.startsWith('vendor-misc'));
let b1 = `=== FILE: index.html ===\n${indexHtml}\n=== FILE: 404.html ===\n${indexHtml}\n`;
for (const f of batch1Files) {
  b1 += getFileSection(`assets/${f}`);
}
fs.writeFileSync('d:/Wix/cultured-pearl/batch1.txt', b1);
console.log('Batch 1 characters:', b1.length, 'Files:', batch1Files.length + 2);

// Batch 2: vendor-misc
const miscFile = assetFiles.find(f => f.startsWith('vendor-misc'));
if (miscFile) {
  const b2 = getFileSection(`assets/${miscFile}`);
  fs.writeFileSync('d:/Wix/cultured-pearl/batch2.txt', b2);
  console.log('Batch 2 (misc) characters:', b2.length);
}

// Batch 3: vendor-react
const reactFile = assetFiles.find(f => f.startsWith('vendor-react'));
if (reactFile) {
  const b3 = getFileSection(`assets/${reactFile}`);
  fs.writeFileSync('d:/Wix/cultured-pearl/batch3.txt', b3);
  console.log('Batch 3 (react) characters:', b3.length);
}
