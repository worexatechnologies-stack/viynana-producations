const fs = require('fs');
const { execSync } = require('child_process');
const ffmpeg = require('./node_modules/ffmpeg-static');

// Extract crisp 1920x1080 poster from website-video-2.mp4 at 1.0s
try {
  execSync(`"${ffmpeg}" -y -ss 00:00:01.000 -i "public/website-video-2.mp4" -vframes 1 -q:v 2 "public/images/hero-viyana-orbital-poster.jpg"`, { stdio: 'inherit' });
  console.log('Created hero-viyana-orbital-poster.jpg:', fs.statSync('public/images/hero-viyana-orbital-poster.jpg').size);
} catch(e) {
  console.error(e.message);
}
