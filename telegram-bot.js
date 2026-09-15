/**
 * Telegram Prompt Architect Bot v5.0
 * Direct, Uncompromising, Universal Prompt Generator
 * Token: 8904951015:AAEFAOUE1NKBmVwTFmfSHazSZp6Fpi1ezpY
 */

const https = require('https');
const { buildUniversalPrompt } = require('./universal-engine');

const TOKEN = '8904951015:AAEFAOUE1NKBmVwTFmfSHazSZp6Fpi1ezpY';
const BASE_URL = `https://api.telegram.org/bot${TOKEN}`;

function escapeHtml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function apiCall(method, payload = {}) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(payload);
    const url = new URL(`${BASE_URL}/${method}`);
    
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      },
      timeout: 10000
    };

    const req = https.request(url, options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(body);
          if (parsed.ok) {
            resolve(parsed.result);
          } else {
            reject(new Error(parsed.description || 'Telegram API Error'));
          }
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });

    req.write(data);
    req.end();
  });
}

async function sendMessage(chatId, text, replyToMessageId = null) {
  try {
    return await apiCall('sendMessage', {
      chat_id: chatId,
      text: text,
      parse_mode: 'HTML',
      ...(replyToMessageId ? { reply_to_message_id: replyToMessageId } : {})
    });
  } catch (err) {
    const plain = text.replace(/<[^>]*>/g, '');
    return await apiCall('sendMessage', {
      chat_id: chatId,
      text: plain,
      ...(replyToMessageId ? { reply_to_message_id: replyToMessageId } : {})
    });
  }
}

async function handleUpdate(update) {
  const msg = update.message;
  if (!msg) return;

  const chatId = msg.chat.id;
  const username = msg.from ? (msg.from.username || msg.from.first_name) : '';
  const input = msg.text || msg.caption || '';

  console.log(`[User ${username}]:`, input || (msg.photo ? '[Photo]' : 'unknown'));

  if (input.startsWith('/start')) {
    const welcome = `أهلاً بك في <b>مهندس الأوامر المباشر (Prompt Architect)</b> ⚡

اكتب أي موضوع أو مجال أو فكرة بلهجتك أو بأسلوبك، وسأحولها لك فوراً إلى <b>برومبت احترافي عالي الفعالية</b> جاهز للنسخ المباشر دون أي تصنيفات مقيدة ودون لف ودوران.`;
    await sendMessage(chatId, welcome);
    return;
  }

  // بناء البرومبت المباشر حسب طلب المستخدم 1:1
  const result = buildUniversalPrompt(input || 'الطلب المرسل في الصورة');

  const reply = `🎯 <b>${escapeHtml(result.title)}</b>

⚡ <b>[البرومبت الاحترافي الجاهز للنسخ فوراً]:</b>
<code>${escapeHtml(result.prompt)}</code>

═══════════════════

💡 <b>${escapeHtml(result.tip)}</b>`;

  await sendMessage(chatId, reply, msg.message_id);
}

let offset = 0;

async function runLoop() {
  console.log('🚀 بوت التيليجرام v5.0 (المباشر بدون قيود وبدون تصنيف مسبق) قيد الاستماع...');
  
  while (true) {
    try {
      const updates = await apiCall('getUpdates', {
        offset: offset,
        limit: 10,
        timeout: 1
      });

      if (Array.isArray(updates) && updates.length > 0) {
        for (const update of updates) {
          offset = update.update_id + 1;
          await handleUpdate(update).catch(e => console.error('Update error:', e));
        }
      }
    } catch (err) {
      // استمرار فوري
    }
    await new Promise(r => setTimeout(r, 200));
  }
}

process.on('uncaughtException', (err) => console.error('Uncaught Exception:', err));
process.on('unhandledRejection', (reason) => console.error('Unhandled Rejection:', reason));

runLoop();
