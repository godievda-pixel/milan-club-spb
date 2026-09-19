# Milan Club San Pietroburgo — Mini App v0.3

Premium mobile-first fan club app for Milan Club SPB.

## Сейчас работает
- Главная и ближайшие матчи
- Календарь и фильтры
- Совместные просмотры + локальный RSVP
- Fan Club / история
- Бар и меню
- Ручная настройка бара
- Контакты
- Telegram Mini App SDK
- Telegram-профиль в интерфейсе
- Telegram BackButton и safe-area friendly UI

## Telegram
В `index.html` подключён официальный Telegram WebApp SDK.
`telegram.js` вызывает `ready()` / `expand()`, настраивает цвета Mini App, BackButton и читает `initDataUnsafe.user` только для отображения профиля.

Важно: перед использованием Telegram-профиля на сервере нужно валидировать `initData`. Клиентским данным доверять нельзя.

## Привязка к боту
После публикации приложения на публичном HTTPS URL:

```bash
TELEGRAM_BOT_TOKEN=... MINI_APP_URL=https://... npm run configure-bot
```

Скрипт `scripts/setup-bot.mjs` установит Mini App как menu button через `setChatMenuButton` и добавит команды `/start` и `/app`.

## Настройка бара
Откройте `Ещё → Наш бар → Изменить`. Пока настройка хранится локально на устройстве. В production перенесём её в общую БД/админку.

## Локальная проверка

```bash
npm run check
python3 -m http.server 8080
```

Для настоящего запуска внутри Telegram нужен публичный HTTPS адрес.

## Cloudflare Workers Static Assets

Проект подготовлен для отдельного Worker `milan-club-spb`.

```bash
npm run build
npx wrangler@latest deploy
```

`wrangler.jsonc` публикует папку `dist/` через Workers Static Assets. После первого deploy Cloudflare выдаст публичный HTTPS URL, который нужно передать в `MINI_APP_URL` и затем выполнить `npm run configure-bot`.

Cloudflare рекомендует Workers Static Assets для новых проектов и `wrangler.jsonc` как основной формат конфигурации.

## GitHub Actions

В репозитории есть два ручных workflow:

- `Deploy Milan Club Mini App` — проверяет JS, собирает `dist/` и деплоит отдельный Worker через `cloudflare/wrangler-action@v4`.
- `Configure Telegram Bot` — ставит Mini App в menu button бота.

Нужные GitHub Secrets:
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`
- `TELEGRAM_BOT_TOKEN`
- `MINI_APP_URL`

Workflow запускаются только вручную через вкладку Actions.
