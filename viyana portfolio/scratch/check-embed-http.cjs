const https = require('https');

const reelId = 'DfPiKmuMugc';
const options = {
  hostname: 'www.instagram.com',
  path: `/reel/${reelId}/embed/`,
  method: 'GET',
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
  }
};

const req = https.request(options, (res) => {
  console.log(`Status: ${res.statusCode}`);
  console.log(`Headers:`, res.headers);
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
    if (data.length > 500) {
      console.log('Preview:', data.slice(0, 300));
      req.destroy();
    }
  });
});

req.on('error', (e) => {
  console.error('Error:', e.message);
});

req.end();

