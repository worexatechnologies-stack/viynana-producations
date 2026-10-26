const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const ffmpeg = require('./node_modules/ffmpeg-static');

const src = 'C:/Users/GOLLA GANESH/.gemini/antigravity-ide/brain/6f0e5894-9457-423b-8bec-b83c6f68f70d/.user_uploaded/media_1792672122115.png';
const dest = path.join(__dirname, 'public/images/viyana-orbital-logo.png');
fs.copyFileSync(src, dest);
console.log('Copied orbital logo to', dest);

try {
  const res = execSync(`"${ffmpeg}" -i "${dest}" 2>&1`).toString();
  const match = res.match(/Video:.*,\s*(\d+x\d+)/);
  console.log('Logo resolution:', match ? match[1] : 'unknown');
} catch(e) {
  console.log('Error checking resolution:', e.message);
}
