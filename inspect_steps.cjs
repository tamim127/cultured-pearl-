const fs = require('fs');
const content = fs.readFileSync('C:/Users/bdCalling/.gemini/antigravity/brain/9d69e3e7-c269-4cd8-a614-e35ba5b24f34/.system_generated/steps/164/output.txt', 'utf8');

const s3 = content.indexOf('## 3.');
const s4 = content.indexOf('## 4.');
const s5 = content.indexOf('## 5.');

console.log('=== STEP 3 ===');
console.log(content.substring(s3, s4));
console.log('=== STEP 4 ===');
console.log(content.substring(s4, s5));
console.log('=== STEP 5 ===');
console.log(content.substring(s5, s5 + 3000));
