const fs = require('fs');
const { execSync } = require('child_process');
const ffmpeg = require('./node_modules/ffmpeg-static');

// Let's create an OCR or slice the image to see what is on the left, center, right
// We can extract 3 slices of viyana-orbital-logo.png: left (0-340), mid (340-680), right (680-1024)
try {
  execSync(`"${ffmpeg}" -y -i public/images/viyana-orbital-logo.png -filter_complex "[0:v]crop=340:188:0:0[l];[0:v]crop=340:188:342:0[m];[0:v]crop=340:188:684:0[r]" -map "[l]" public/images/logo_slice_l.png -map "[m]" public/images/logo_slice_m.png -map "[r]" public/images/logo_slice_r.png`);
  console.log('Slices created');
  console.log('l:', fs.statSync('public/images/logo_slice_l.png').size);
  console.log('m:', fs.statSync('public/images/logo_slice_m.png').size);
  console.log('r:', fs.statSync('public/images/logo_slice_r.png').size);
} catch(e) {
  console.error(e.message);
}
