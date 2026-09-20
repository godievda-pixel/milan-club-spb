const APP_URL = 'https://milan-club-spb.ciao-web.workers.dev';

const encoder = new TextEncoder();

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {'content-type': 'application/json; charset=utf-8'}
  });
}

async function sha256Hex(value) {
  const digest = await crypto.subtle.digest('SHA-256', encoder.encode(value));
  return Array.from(new Uint8Array(digest))
    .map(byte => byte.toString(16).padStart(2, '0'))
    .join('');
}

async function telegramCall(token, method, payload) {
  const response = await fetch(`https://api.telegram.org/bot${token}/${method}`, {
    method: 'POST',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify(payload)
  });

  const result = await response.json().catch(() => ({}));
  if (!response.ok || !result.ok) {
    throw new Error(`${method}: ${result.description || response.status}`);
  }
  return result.result;
}

function commandFrom(message) {
  const text = String(message?.text || '').trim();
  if (!text.startsWith('/')) return '';
  return text.split(/\s+/)[0].split('@')[0].toLowerCase();
}

async function sendWelcome(token, message) {
  const firstName = String(message?.from?.first_name || '').trim();
  const hello = firstName ? `Привет, ${firstName}!\n\n` : '';

  return telegramCall(token, 'sendMessage', {
    chat_id: message.chat.id,
    parse_mode: 'HTML',
    disable_web_page_preview: true,
    text:
      `${hello}<b>Добро пожаловать в AC Milan Club San Pietroburgo 🔴⚫</b>\n\n` +
      'Здесь собраны ближайшие матчи «Милана», совместные просмотры в Санкт-Петербурге, наши бары, история фан-клуба и твой Rossoneri ID.\n\n' +
      '<i>Sempre con te sarò. Sempre rossonero.</i>',
    reply_markup: {
      inline_keyboard: [[
        {
          text: 'Открыть Milan Club',
          web_app: {url: APP_URL}
        }
      ]]
    }
  });
}

async function handleTelegramWebhook(request, env) {
  const token = env.TELEGRAM_BOT_TOKEN;
  if (!token) return json({ok:false,error:'Bot token is not configured'}, 500);

  const expectedSecret = (await sha256Hex(token)).slice(0, 48);
  const receivedSecret = request.headers.get('x-telegram-bot-api-secret-token') || '';
  if (receivedSecret !== expectedSecret) {
    return json({ok:false,error:'Unauthorized'}, 401);
  }

  const update = await request.json().catch(() => null);
  const message = update?.message;
  if (!message?.chat?.id) return json({ok:true});

  const command = commandFrom(message);
  if (command === '/start' || command === '/app') {
    await sendWelcome(token, message);
  }

  return json({ok:true});
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/telegram-webhook') {
      if (request.method !== 'POST') return new Response('Method Not Allowed', {status:405});
      try {
        return await handleTelegramWebhook(request, env);
      } catch (error) {
        console.error('Telegram webhook error', error);
        return json({ok:false,error:'Webhook error'}, 500);
      }
    }

    return env.ASSETS.fetch(request);
  }
};
