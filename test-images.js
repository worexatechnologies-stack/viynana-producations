const fs = require('fs');
const path = require('path');
const https = require('https');

function getAllFiles(dirPath, arrayOfFiles) {
  let files = fs.readdirSync(dirPath)
  arrayOfFiles = arrayOfFiles || []
  files.forEach(function(file) {
    if (fs.statSync(dirPath + '/' + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + '/' + file, arrayOfFiles)
    } else {
      arrayOfFiles.push(path.join(__dirname, dirPath, '/', file))
    }
  })
  return arrayOfFiles
}

const files = getAllFiles('src').filter(f => f.endsWith('.ts') || f.endsWith('.tsx'));
const urls = new Set();
const urlRegex = /(https:\/\/(images\.unsplash\.com|videos\.pexels\.com)[^\s\"\'\`]+)/g;

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  let match;
  while ((match = urlRegex.exec(content)) !== null) {
    urls.add(match[1]);
  }
});

console.log('Found ' + urls.size + ' unique URLs');

async function checkUrl(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      if (res.statusCode >= 400) {
        console.log('BROKEN: ' + res.statusCode + ' ' + url);
      }
      res.resume();
      resolve();
    }).on('error', (e) => {
      console.log('ERROR: ' + e.message + ' ' + url);
      resolve();
    });
  });
}

async function run() {
  for (let url of urls) {
    await checkUrl(url);
  }
  console.log('Done checking.');
}
run();
