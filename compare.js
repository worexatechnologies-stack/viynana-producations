const fs = require('fs');
const { execSync } = require('child_process');
const ffmpeg = require('./node_modules/ffmpeg-static');

// Let's inspect wv2_1.0.jpg by scaling it down to ASCII or printing brightest pixel coords
try {
  execSync(`"${ffmpeg}" -y -i "public/images/probe/wv2_1.0.jpg" -vf "crop=1024:188:448:446" "public/images/probe/wv2_crop.jpg"`, { stdio: 'inherit' });
  console.log('Cropped successfully, size:', fs.statSync('public/images/probe/wv2_crop.jpg').size);
} catch(e) {
  console.error(e.message);
}
