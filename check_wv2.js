const fs = require('fs');
const { execSync } = require('child_process');
const ffmpeg = require('./node_modules/ffmpeg-static');

for (const t of ['0.2', '0.5', '1.0', '1.5', '2.0', '2.5']) {
  try {
    execSync(`"${ffmpeg}" -y -ss ${t} -i "public/website-video-2.mp4" -vframes 1 "public/images/probe/wv2_${t}.jpg"`, { stdio: 'ignore' });
    console.log(`Extracted wv2_${t}.jpg:`, fs.statSync(`public/images/probe/wv2_${t}.jpg`).size);
  } catch(e) {}
}
