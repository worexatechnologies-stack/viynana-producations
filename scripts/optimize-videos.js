const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const ffmpeg = require("ffmpeg-static");

const publicDir = path.resolve(__dirname, "../public");
const backupDir = path.resolve(publicDir, "video-originals");

if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
}

const targets = [
  {
    name: "showreel-master.mp4",
    scale: "scale=-2:1080", // 1080p widescreen
    fps: 30,
    crf: 23,
  },
  {
    name: "showreel-video-4k-h264.mp4",
    scale: "scale=-2:1080",
    fps: 30,
    crf: 23,
  },
  {
    name: "website-video-2.mp4",
    scale: "scale=-2:1080",
    fps: 30,
    crf: 23,
  },
  {
    name: "viyana-production-final-video.mp4",
    scale: "scale=-2:1280", // 720x1280 vertical reel
    fps: 30,
    crf: 23,
  },
  {
    name: "viyana production final video.mp4",
    scale: "scale=-2:1280",
    fps: 30,
    crf: 23,
  },
  {
    name: "viyana-ganesha.mp4",
    scale: "scale=-2:1280", // 720x1280 vertical reel
    fps: 30,
    crf: 23,
  },
  {
    name: "viyana ganesha.mp4",
    scale: "scale=-2:1280",
    fps: 30,
    crf: 23,
  },
  {
    name: "viyana-commercial-reel.mp4",
    scale: "scale=-2:1280", // 720x1280 vertical reel
    fps: 30,
    crf: 23,
  },
  {
    name: "2.mp4",
    scale: "scale=-2:1280",
    fps: 30,
    crf: 23,
  },
];

console.log("🎬 Starting high-performance video optimization for instant web streaming...\n");

for (const target of targets) {
  const filePath = path.join(publicDir, target.name);
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️ Skip: ${target.name} not found.`);
    continue;
  }

  const backupPath = path.join(backupDir, target.name);
  if (!fs.existsSync(backupPath)) {
    console.log(`📦 Backing up original ${target.name}...`);
    fs.copyFileSync(filePath, backupPath);
  }

  const tempOutputPath = path.join(publicDir, `temp-${target.name}`);
  const originalSizeMB = (fs.statSync(backupPath).size / (1024 * 1024)).toFixed(2);

  console.log(`⚡ Optimizing ${target.name} (Original: ${originalSizeMB} MB)...`);
  
  const cmd = `"${ffmpeg}" -y -i "${backupPath}" -vf "${target.scale}" -r ${target.fps} -c:v libx264 -preset fast -crf ${target.crf} -c:a aac -b:a 128k -movflags +faststart "${tempOutputPath}"`;

  try {
    execSync(cmd, { stdio: "inherit" });
    if (fs.existsSync(tempOutputPath) && fs.statSync(tempOutputPath).size > 1000) {
      fs.copyFileSync(tempOutputPath, filePath);
      fs.unlinkSync(tempOutputPath);
      const newSizeMB = (fs.statSync(filePath).size / (1024 * 1024)).toFixed(2);
      const reduction = (100 - (newSizeMB / originalSizeMB) * 100).toFixed(1);
      console.log(`✅ Success: ${target.name} -> ${newSizeMB} MB (${reduction}% reduction! Zero lag + instant faststart)\n`);
    } else {
      console.error(`❌ Output file was invalid for ${target.name}`);
    }
  } catch (err) {
    console.error(`❌ Error optimizing ${target.name}:`, err.message);
    if (fs.existsSync(tempOutputPath)) fs.unlinkSync(tempOutputPath);
  }
}

// Also check if videoplayback.webm or space saving is needed
console.log("🎉 All videos optimized with faststart metadata and streaming bitrates!");
