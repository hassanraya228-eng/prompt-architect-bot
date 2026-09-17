/**
 * Direct Image Generation and Delivery Module
 * Downloads the image buffer locally to server before sending to Telegram
 * Solves Telegram "failed to get HTTP URL content" error completely.
 */

const https = require('https');
const http = require('http');

function fetchImageBuffer(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    protocol.get(url, (res) => {
      // Follow redirects if any
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchImageBuffer(res.headers.location).then(resolve).catch(reject);
      }

      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to download image. Status code: ${res.statusCode}`));
      }

      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    }).on('error', reject);
  });
}

function getDirectFluxImageUrl(positivePrompt, width = 1024, height = 1024) {
  // Enforce true photorealism in prompt
  const enhancedPrompt = `hyperrealistic candid 35mm photo, authentic real life photograph, ${positivePrompt.slice(0, 400)}`;
  const cleanPrompt = encodeURIComponent(enhancedPrompt);
  const seed = Math.floor(Math.random() * 999999);
  return `https://image.pollinations.ai/prompt/${cleanPrompt}?model=flux-realism&width=${width}&height=${height}&seed=${seed}&nologo=true`;
}

module.exports = {
  fetchImageBuffer,
  getDirectFluxImageUrl
};
