const fs = require('fs');
const path = require('path');

const distDir = 'd:/Wix/cultured-pearl/dist';

function getFileSection(relPath, isBinary = false) {
  const fullPath = path.join(distDir, relPath);
  if (isBinary) {
    const data = fs.readFileSync(fullPath).toString('base64');
    return `=== FILE: ${relPath} base64 ===\n${data}\n`;
  } else {
    const data = fs.readFileSync(fullPath, 'utf8');
    return `=== FILE: ${relPath} ===\n${data}\n`;
  }
}

// Read index.html
const indexHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');

// Find css and js filenames in dist/assets
const assetFiles = fs.readdirSync(path.join(distDir, 'assets'));
const cssFile = assetFiles.find(f => f.endsWith('.css'));
const jsFile = assetFiles.find(f => f.endsWith('.js'));

console.log('CSS:', cssFile);
console.log('JS:', jsFile);

let bundle = '';
bundle += `=== FILE: index.html ===\n${indexHtml}\n`;
bundle += `=== FILE: 404.html ===\n${indexHtml}\n`;
bundle += getFileSection(`assets/${cssFile}`);
bundle += getFileSection(`assets/${jsFile}`);
bundle += getFileSection('favicon.ico', true);

fs.writeFileSync('d:/Wix/cultured-pearl/bundle.txt', bundle);
console.log('Bundle created. Size in bytes:', Buffer.byteLength(bundle, 'utf8'));
