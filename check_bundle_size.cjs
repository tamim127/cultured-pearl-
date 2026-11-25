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

let batch1 = `=== FILE: index.html ===\n${indexHtml}\n=== FILE: 404.html ===\n${indexHtml}\n`;
for (const f of assetFiles) {
  batch1 += getFileSection(`assets/${f}`);
}

fs.writeFileSync('d:/Wix/cultured-pearl/bundle_all.txt', batch1);
console.log('Total bundle size in characters:', batch1.length);
console.log('Included files:', assetFiles.length + 2);
