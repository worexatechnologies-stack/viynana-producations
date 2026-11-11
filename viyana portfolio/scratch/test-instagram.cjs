const https = require('https');

const urls = [
  'https://www.instagram.com/reel/DfPiKmuMugc/',
  'https://www.instagram.com/reel/DfCi048T8Jz/',
  'https://www.instagram.com/reel/De9Vwv6CBSj/',
  'https://www.instagram.com/reel/DeuCeLIzMWk/'
];

console.log('Testing Instagram Reel embed paths:');
urls.forEach((u, i) => {
  const idMatch = u.match(/reel\/([^/?]+)/);
  const id = idMatch ? idMatch[1] : '';
  console.log(`Reel ${i + 1}: ID=${id}, embedURL=https://www.instagram.com/reel/${id}/embed/`);
});

