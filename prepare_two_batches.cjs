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

const mainJs = assetFiles.find(f => f.startsWith('index-') && f.endsWith('.js'));
const otherFiles = assetFiles.filter(f => f !== mainJs);

// Batch 1: index.html, 404.html, and all route chunks + css
let b1 = `=== FILE: index.html ===\n${indexHtml}\n=== FILE: 404.html ===\n${indexHtml}\n`;
for (const f of otherFiles) {
  b1 += getFileSection(`assets/${f}`);
}
fs.writeFileSync('d:/Wix/cultured-pearl/batch1.txt', b1);
console.log('Batch 1 chars:', b1.length, 'Files:', otherFiles.length + 2);

// Batch 2: main js
const b2 = getFileSection(`assets/${mainJs}`);
fs.writeFileSync('d:/Wix/cultured-pearl/batch2.txt', b2);
console.log('Batch 2 chars:', b2.length, 'File:', mainJs);
