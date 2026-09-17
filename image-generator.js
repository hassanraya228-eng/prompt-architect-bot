/**
 * Direct Image Generation and Delivery Module v12.0
 * Features:
 * - Anti-Distortion: 768x1024 / 896x1152 aspect ratios preventing squished heads/limbs
 * - Automatic Watermark Stripping via local FFmpeg crop on VPS
 * - Pure Photorealism prompt tuning (eliminates uncanny valley & anime)
 */

const https = require('https');
const http = require('http');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

function downloadBuffer(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    protocol.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadBuffer(res.headers.location).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to download image. Status: ${res.statusCode}`));
      }
      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    }).on('error', reject);
  });
}

/**
 * Downloads image and strips Pollinations bottom logo if present using ffmpeg
 */
async function fetchImageBuffer(url) {
  const rawBuffer = await downloadBuffer(url);

  return new Promise((resolve) => {
    const tmpInput = path.join('/tmp', `raw_${Date.now()}_${Math.floor(Math.random() * 1000)}.jpg`);
    const tmpOutput = path.join('/tmp', `clean_${Date.now()}_${Math.floor(Math.random() * 1000)}.jpg`);

    fs.writeFile(tmpInput, rawBuffer, (err) => {
      if (err) {
        return resolve(rawBuffer); // Fallback to raw if disk error
      }

      // Crop out bottom 42px where pollinations watermark sits
      exec(`ffmpeg -i "${tmpInput}" -vf "crop=in_w:in_h-42:0:0" "${tmpOutput}" -y`, (ffErr) => {
        try { fs.unlinkSync(tmpInput); } catch (_) {}

        if (ffErr || !fs.existsSync(tmpOutput)) {
          return resolve(rawBuffer);
        }

        fs.readFile(tmpOutput, (readErr, cleanBuffer) => {
          try { fs.unlinkSync(tmpOutput); } catch (_) {}
          if (readErr || !cleanBuffer || cleanBuffer.length === 0) {
            return resolve(rawBuffer);
          }
          resolve(cleanBuffer);
        });
      });
    });
  });
}

function getDirectFluxImageUrl(positivePrompt, width = 768, height = 1024) {
  // Anti-distortion realism injection
  const enhancedPrompt = `cinematic 35mm photograph, perfectly proportional anatomy, symmetrical detailed eyes, natural skin texture and pores, authentic human facial features, Kodak Portra 400, ${positivePrompt.slice(0, 380)}`;
  const cleanPrompt = encodeURIComponent(enhancedPrompt);
  const seed = Math.floor(Math.random() * 9999999);
  return `https://image.pollinations.ai/prompt/${cleanPrompt}?model=flux&width=${width}&height=${height}&seed=${seed}&nologo=true`;
}

module.exports = {
  fetchImageBuffer,
  getDirectFluxImageUrl
};
