const fs = require('fs');
const path = require('path');
const ffmpeg = require('./node_modules/ffmpeg-static');
const { execSync } = require('child_process');

const root = __dirname;
const videos = fs.readdirSync(path.join(root, 'public')).filter(f => f.endsWith('.mp4'));

// Let's sample every second for first 10 seconds of all videos
for (const vid of videos) {
  const vidPath = path.join(root, 'public', vid);
  for (let s = 0; s <= 6; s++) {
    const out = path.join(root, 'public/images/probe', `${vid.replace(/[^a-zA-Z0-9]/g, '_')}_${s}.jpg`);
    try {
      execSync(`"${ffmpeg}" -y -ss 00:00:0${s} -i "${vidPath}" -vframes 1 "${out}"`, { stdio: 'ignore' });
    } catch(e) {}
  }
}
console.log('Finished probing frames');
