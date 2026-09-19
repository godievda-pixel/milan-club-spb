const token = process.env.TELEGRAM_BOT_TOKEN;
const appUrl = process.env.MINI_APP_URL;
const menuText = process.env.MENU_BUTTON_TEXT || 'Milan Club';

if (!token || !appUrl) {
  console.error('Set TELEGRAM_BOT_TOKEN and MINI_APP_URL before running this script.');
  process.exit(1);
}
if (!/^https:\/\//i.test(appUrl)) {
  console.error('MINI_APP_URL must be an HTTPS URL.');
  process.exit(1);
}

const api = `https://api.telegram.org/bot${token}`;
async function call(method, payload = {}) {
  const res = await fetch(`${api}/${method}`, {
    method: 'POST',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify(payload)
  });
  const data = await res.json();
  if (!data.ok) throw new Error(`${method}: ${data.description || 'Telegram API error'}`);
  return data.result;
}

const me = await call('getMe');\nconsole.log(`Bot ID: ${me.id}`);
await call('setChatMenuButton', {
  menu_button: {
    type: 'web_app',
    text: menuText,
    web_app: {url: appUrl}
  }
});
await call('setMyCommands', {
  commands: [
    {command: 'start', description: 'Открыть Milan Club'},
    {command: 'app', description: 'Открыть приложение'}
  ]
});

console.log(`Configured @${me.username}: ${menuText} -> ${appUrl}`);
