const fs = require('fs');
const path = require('path');
const ffmpeg = require('./node_modules/ffmpeg-static');
const { execSync } = require('child_process');

const root = __dirname;
const videos = fs.readdirSync(path.join(root, 'public')).filter(f => f.endsWith('.mp4'));

for (const v of videos) {
  try {
    execSync(`"${ffmpeg}" -i "public/${v}"`);
  } catch(e) {
    const text = (e.stderr ? e.stderr.toString() : '') + (e.stdout ? e.stdout.toString() : '');
    const durMatch = text.match(/Duration: (\d{2}:\d{2}:\d{2}\.\d{2})/);
    console.log(`${v} -> Duration: ${durMatch ? durMatch[1] : 'unknown'}`);
  }
}
