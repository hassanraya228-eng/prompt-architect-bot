/**
 * Direct Image Generation Module via High-Performance Flux.1
 */

const https = require('https');

function getDirectFluxImageUrl(positivePrompt, width = 1024, height = 1024) {
  // Clean prompt for URL
  const cleanPrompt = encodeURIComponent(positivePrompt.slice(0, 450));
  const seed = Math.floor(Math.random() * 999999);
  return `https://image.pollinations.ai/prompt/${cleanPrompt}?model=flux&width=${width}&height=${height}&seed=${seed}&nologo=true`;
}

module.exports = {
  getDirectFluxImageUrl
};
