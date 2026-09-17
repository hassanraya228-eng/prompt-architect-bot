/**
 * Direct Image Generation and Delivery Module v16.0
 * Features:
 * - Text-to-Image & Image-to-Image (Inpainting / Reference Conditioning)
 * - Automatic Watermark Stripping via local FFmpeg crop on VPS
 * - Temporary CDN hosting for Telegram incoming photos so model can condition on exact face/features.
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
 * Uploads a local buffer to temporary CDN to get a public direct link
 * used as reference image for Flux image-to-image
 */
function uploadTempCDN(imageBuffer) {
  return new Promise((resolve, reject) => {
    const boundary = '----WebKitFormBoundary' + Math.random().toString(36).substring(2);
    const postData = Buffer.concat([
      Buffer.from(`--${boundary}\r\nContent-Disposition: form-data; name="file"; filename="ref.jpg"\r\nContent-Type: image/jpeg\r\n\r\n`),
      imageBuffer,
      Buffer.from(`\r\n--${boundary}--\r\n`)
    ]);

    const req = https.request({
      hostname: 'tmpfiles.org',
      path: '/api/v1/upload',
      method: 'POST',
      headers: {
        'Content-Type': `multipart/form-data; boundary=${boundary}`,
        'Content-Length': postData.length
      },
      timeout: 20000
    }, (res) => {
      let body = '';
      res.on('data', d => body += d);
      res.on('end', () => {
        try {
          const json = JSON.parse(body);
          if (json.status === 'success' && json.data && json.data.url) {
            // Convert tmpfiles.org/123/ref.jpg -> tmpfiles.org/dl/123/ref.jpg for direct raw image stream
            const directUrl = json.data.url.replace('tmpfiles.org/', 'tmpfiles.org/dl/');
            resolve(directUrl);
          } else {
            reject(new Error('CDN upload failed'));
          }
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('CDN Timeout'));
    });
    req.write(postData);
    req.end();
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
      if (err) return resolve(rawBuffer);

      // Crop out bottom 42px where watermark sits
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

function getDirectFluxImageUrl(positivePrompt, width = 768, height = 1024, referenceImageUrl = null) {
  let enhancedPrompt = `cinematic 35mm photograph, perfectly proportional anatomy, symmetrical detailed eyes, natural skin texture, Kodak Portra 400, ${positivePrompt.slice(0, 360)}`;
  
  if (referenceImageUrl) {
    // Exact likeness preservation
    enhancedPrompt = `hyperrealistic 35mm photograph preserving the exact same woman, identical face, same facial features and identity as reference image, ${positivePrompt.slice(0, 340)}`;
  }

  const cleanPrompt = encodeURIComponent(enhancedPrompt);
  const seed = Math.floor(Math.random() * 9999999);
  let url = `https://image.pollinations.ai/prompt/${cleanPrompt}?model=flux&width=${width}&height=${height}&seed=${seed}&nologo=true`;

  if (referenceImageUrl) {
    url += `&image=${encodeURIComponent(referenceImageUrl)}`;
  }

  return url;
}

module.exports = {
  fetchImageBuffer,
  getDirectFluxImageUrl,
  uploadTempCDN,
  downloadBuffer
};
