const TelegramBridge = window.MilanTelegram || {
  init(){}, user(){ return null; }, fullName(){ return 'Milanista'; }, isInsideTelegram(){ return false; },
  showBack(){}, onBack(){}, haptic(){}, open(url){ if (url) window.open(url, '_blank', 'noopener'); }, applyProfileChip(){}
};
TelegramBridge.init();

let fixtures = [
  {date:'20', month:'сен', iso:'2026-09-20', home:'AC Milan', away:'Lecce', competition:'Serie A · 5 тур', time:'21:45 МСК', watched:true, status:'ПРОСМОТР'},
  {date:'10/11', month:'окт', iso:'2026-10-10', home:'Sassuolo', away:'AC Milan', competition:'Serie A · 6 тур', time:'время уточняется', watched:false, status:''},
  {date:'15', month:'окт', iso:'2026-10-15', home:'Salzburg', away:'AC Milan', competition:'Europa League · 2 тур', time:'19:45 МСК', watched:true, status:'ПРОСМОТР'},
  {date:'17/18', month:'окт', iso:'2026-10-17', home:'AC Milan', away:'Atalanta', competition:'Serie A · 7 тур', time:'время уточняется', watched:true, status:'ПРОСМОТР'},
  {date:'22', month:'окт', iso:'2026-10-22', home:'Bournemouth', away:'AC Milan', competition:'Europa League · 3 тур', time:'22:00 МСК', watched:true, status:'ПРОСМОТР'},
  {date:'24/25', month:'окт', iso:'2026-10-24', home:'Udinese', away:'AC Milan', competition:'Serie A · 8 тур', time:'время уточняется', watched:false, status:''},
  {date:'28', month:'окт', iso:'2026-10-28', home:'AC Milan', away:'Bologna', competition:'Serie A · 9 тур', time:'время уточняется', watched:true, status:'ПРОСМОТР'},
  {date:'31/01', month:'окт/ноя', iso:'2026-10-31', home:'AC Milan', away:'Inter', competition:'Serie A · Derby', time:'время уточняется', watched:true, status:'ПРОСМОТР'}
];

let menu = {
  'Пиво': [
    ['Guinness','0,5 л','690 ₽'], ['Kilkenny','0,5 л','690 ₽'], ['Сидр','0,5 л','590 ₽']
  ],
  'Закуски': [
    ['Fish & Chips','','890 ₽'], ['Крылья Buffalo','','690 ₽'], ['Начос','','590 ₽']
  ],
  'Основное': [
    ['Irish Burger','','890 ₽'], ['Steak Pie','','990 ₽'], ['Club Sandwich','','790 ₽']
  ]
};

let contacts = [
  {name:'Даниил', role:'Организация просмотров', initials:'Д'},
  {name:'Команда Milan Club SPB', role:'Членство и мероприятия', initials:'M'}
];

let remoteBar = null;
let historyEntries = [];
let watchParties = [];
let memberState = null;
let remoteLoaded = false;
const Backend = window.MilanBackend || null;

const defaultBar = {
  name: 'Бар пока не выбран',
  address: 'Укажите адрес площадки',
  meeting: 'Сбор гостей за 60 минут до матча',
  mapUrl: ''
};

function getBar() {
  if (remoteBar) return {...defaultBar, ...remoteBar};
  try { return {...defaultBar, ...JSON.parse(localStorage.getItem('milanclub:bar') || '{}')}; }
  catch { return {...defaultBar}; }
}

function saveBar(data) {
  localStorage.setItem('milanclub:bar', JSON.stringify(data));
}

let currentRoute = 'home';
let filter = 'Все';
let editingBar = false;
const app = document.querySelector('#app');
const routeStack = ['home'];

function esc(value='') { return String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c])); }
function isAdmin() { return Boolean(memberState?.profile?.is_admin); }
function activePartyId() { return fixtures.find(f => f.watched && f.partyId)?.partyId || null; }
function joined(partyId = activePartyId()) {
  if (partyId && memberState?.rsvps) return memberState.rsvps.some(r => r.watch_party_id === partyId && r.status === 'going');
  return false;
}
function competitionShort(c='') { return c.startsWith('Serie') ? 'SERIE A' : c.toUpperCase(); }

function moscowParts(iso) {
  if (!iso) return {date:'—', month:'', time:'время уточняется', iso:''};
  const d = new Date(iso);
  const day = new Intl.DateTimeFormat('ru-RU',{timeZone:'Europe/Moscow',day:'numeric'}).format(d);
  const month = new Intl.DateTimeFormat('ru-RU',{timeZone:'Europe/Moscow',month:'short'}).format(d).replace('.','').slice(0,3);
  const time = new Intl.DateTimeFormat('ru-RU',{timeZone:'Europe/Moscow',hour:'2-digit',minute:'2-digit',hour12:false}).format(d);
  return {date:day, month, time:`${time} МСК`, iso};
}

function applyRemoteData(data) {
  if (!data) return;
  watchParties = Array.isArray(data.watch_parties) ? data.watch_parties : [];
  const partyByMatch = new Map(watchParties.map(p => [p.match_id, p]));

  if (Array.isArray(data.matches) && data.matches.length) {
    fixtures = data.matches.map(m => {
      const dt = moscowParts(m.kickoff_at);
      const party = partyByMatch.get(m.id);
      return {
        id:m.id,
        date:dt.date,
        month:dt.month,
        iso:m.kickoff_at || '',
        home:m.home_team,
        away:m.away_team,
        competition:[m.competition,m.round_label].filter(Boolean).join(' · '),
        time:dt.time,
        watched:Boolean(party),
        status:party ? 'ПРОСМОТР' : '',
        partyId:party?.id || null,
        attendeeCount:party?.attendee_count || 0,
        capacity:party?.capacity || null,
        venueId:party?.venue_id || null,
        doorsAt:party?.doors_at || null
      };
    });
  }

  if (Array.isArray(data.venues) && data.venues.length) {
    const v = data.venues[0];
    remoteBar = {
      id:v.id,
      name:v.name,
      address:v.address,
      meeting:v.meeting_note,
      mapUrl:v.map_url || ''
    };
  }

  if (Array.isArray(data.contacts) && data.contacts.length) {
    contacts = data.contacts.map(c => ({
      id:c.id,
      name:c.name,
      role:c.role,
      initials:(c.name || 'M').trim().charAt(0).toUpperCase(),
      telegramUrl:c.telegram_url || (c.telegram_username ? `https://t.me/${String(c.telegram_username).replace(/^@/,'')}` : '')
    }));
  }

  historyEntries = Array.isArray(data.history) ? data.history : [];

  if (Array.isArray(data.menu_categories)) {
    const nextMenu = {};
    for (const category of data.menu_categories) {
      const items = (data.menu_items || [])
        .filter(i => i.category_id === category.id)
        .map(i => [i.name, i.volume || i.description || '', i.price_rub == null ? '' : `${i.price_rub} ₽`]);
      nextMenu[category.name] = items;
    }
    menu = nextMenu;
  }

  remoteLoaded = true;
}

async function refreshPublicData() {
  if (!Backend?.publicBootstrap) return;
  try {
    const data = await Backend.publicBootstrap();
    applyRemoteData(data);
    render(currentRoute, {push:false});
  } catch (error) {
    console.warn('Milan Club bootstrap failed', error);
  }
}

async function refreshMemberState() {
  if (!Backend?.me || !TelegramBridge.isInsideTelegram()) return;
  try {
    memberState = await Backend.me();
    render(currentRoute, {push:false});
  } catch (error) {
    console.warn('Milan Club member API unavailable', error);
  }
}

function renderHome() {
  const next = fixtures[0];
  return `
  <section class="page">
    <div class="eyebrow">Санкт-Петербург · Rossoneri</div>
    <h1 class="page-title">Твой Milan.<br>Твой город.</h1>
    <p class="page-subtitle">Матчи, совместные просмотры и жизнь Milan Club в одном месте.</p>

    <article class="hero">
      <div class="hero-top"><span class="competition">${competitionShort(next.competition)}</span><span class="live-badge">Ближайший матч</span></div>
      <div class="versus">
        <div class="team"><div class="team-badge">ACM</div><strong>Milan</strong></div>
        <div class="match-time"><strong>${next.time.split(' ')[0]}</strong><span>${next.date} ${next.month} · МСК</span></div>
        <div class="team"><div class="team-badge light">LEC</div><strong>Lecce</strong></div>
      </div>
      <div class="hero-meta">${next.watched ? `${esc(getBar().name)} · ${esc(getBar().meeting)}` : 'Совместный просмотр пока не опубликован'}</div>
      <div class="hero-actions">
        ${next.watched
          ? `<button class="primary-btn ${joined(next.partyId) ? 'joined' : ''}" data-action="rsvp" data-party-id="${esc(next.partyId)}">${joined(next.partyId) ? '✓ Я ИДУ' : 'ИДУ НА ПРОСМОТР'}</button>`
          : '<button class="primary-btn joined" type="button" disabled>ЖДЁМ АНОНС ПРОСМОТРА</button>'}
        <button class="secondary-btn" data-route="watch" aria-label="Подробнее">↗</button>
      </div>
    </article>

    <div class="section-head"><h2>Ближайшие матчи</h2><button class="text-btn" data-route="matches">Все →</button></div>
    <div class="horizontal-cards">${fixtures.slice(1,5).map(matchCard).join('')}</div>

    <div class="section-head"><h2>Milan Club SPB</h2><button class="text-btn" data-route="club">История →</button></div>
    <article class="club-teaser" data-route="club">
      <span class="eyebrow">Milano × San Pietroburgo</span>
      <div class="big-copy">Больше, чем просто просмотр футбола.</div>
      <p>Место для тех, кто остаётся с Milan в любой вечер, при любом счёте и в любом городе.</p>
    </article>
  </section>`;
}

function matchCard(f) {
  return `<article class="match-card" data-route="matches">
    <div class="match-card-top"><span>${esc(f.competition)}</span><span>${f.date} ${f.month}</span></div>
    <div class="match-teams">${esc(f.home)}<br>${esc(f.away)}</div>
    <div class="match-card-bottom"><strong>${esc(f.time)}</strong>${f.watched?'<span class="watch-pill">● просмотр</span>':''}</div>
  </article>`;
}

function renderMatches() {
  const filtered = fixtures.filter(f => filter==='Все' || (filter==='Serie A' ? f.competition.startsWith('Serie') : f.competition.startsWith('Europa')));
  return `<section class="page">
    <div class="eyebrow">Календарь 2026/27</div>
    <h1 class="page-title">Матчи</h1>
    <p class="page-subtitle">Время указано по Москве. Для туров, где лига ещё не опубликовала точный слот, показываем «время уточняется».</p>
    <div class="filter-row">${['Все','Serie A','Europa League'].map(x=>`<button class="filter ${filter===x?'active':''}" data-filter="${x}">${x}</button>`).join('')}</div>
    <div class="fixture-list">${filtered.map(f=>`
      <article class="fixture">
        <div class="fixture-date"><strong>${f.date}</strong><span>${f.month}</span></div>
        <div class="fixture-main"><strong>${esc(f.home)} — ${esc(f.away)}</strong><span>${esc(f.competition)}</span></div>
        <div class="fixture-side"><strong>${esc(f.time)}</strong>${f.watched?'<span>● ПРОСМОТР</span>':''}</div>
      </article>`).join('')}</div>
  </section>`;
}

function renderWatch() {
  const parties = fixtures.filter(f => f.watched && f.partyId);
  if (!parties.length) {
    return `<section class="page">
      <div class="eyebrow">Matchday together</div>
      <h1 class="page-title">Просмотры</h1>
      <p class="page-subtitle">Как только организаторы опубликуют совместный просмотр, он появится здесь у всех участников.</p>
      <div class="notice">Сейчас активных просмотров нет. Матчи продолжают отображаться в календаре.</div>
    </section>`;
  }

  const first = parties[0];
  const bar = getBar();
  return `<section class="page">
    <div class="eyebrow">Matchday together</div>
    <h1 class="page-title">Просмотры</h1>
    <p class="page-subtitle">Все совместные матчи фан-клуба: где встречаемся, когда приходить и кто уже идёт.</p>

    <article class="watch-feature">
      <div><span class="eyebrow">${first.date} ${first.month} · ${esc(first.competition)}</span><h2>${esc(first.home)}<br>vs ${esc(first.away)}</h2><p>${esc(bar.name)} · Санкт-Петербург<br>${esc(bar.address)}<br>${esc(bar.meeting)} · Начало: ${esc(first.time)}</p></div>
      <div>
        <div class="watch-stats">
          <div class="watch-stat"><strong>${first.attendeeCount || 0}</strong><span>уже идут</span></div>
          <div class="watch-stat"><strong>${first.capacity || '∞'}</strong><span>мест</span></div>
          <div class="watch-stat"><strong>SPB</strong><span>наш город</span></div>
        </div>
        <button style="margin-top:10px" class="primary-btn ${joined(first.partyId)?'joined':''}" data-action="rsvp" data-party-id="${esc(first.partyId)}">${joined(first.partyId)?'✓ ВЫ В СПИСКЕ':'ПРИСОЕДИНИТЬСЯ'}</button>
      </div>
    </article>

    <div class="section-head"><h2>Следующие просмотры</h2></div>
    <div class="fixture-list">${parties.slice(1).map(f=>`
      <article class="fixture">
        <div class="fixture-date"><strong>${f.date}</strong><span>${f.month}</span></div>
        <div class="fixture-main"><strong>${esc(f.home)} — ${esc(f.away)}</strong><span>${esc(f.competition)} · ${esc(bar.name)}</span></div>
        <div class="fixture-side"><strong>${esc(f.time)}</strong><span>● FAN CLUB</span></div>
      </article>`).join('') || '<div class="notice">Других просмотров пока не опубликовано.</div>'}</div>
  </section>`;
}

function renderClub() {
  return `<section class="page">
    <div class="eyebrow">Milano × San Pietroburgo</div>
    <h1 class="page-title">Fan Club</h1>
    <p class="page-subtitle">Черновая структура истории клуба. Факты, даты и фотографии позже заменим на ваши реальные материалы.</p>
    <div class="stats-grid">
      <div class="stat-card"><strong>SPB</strong><span>наш город</span></div>
      <div class="stat-card"><strong>∞</strong><span>forza milan</span></div>
      <div class="stat-card"><strong>90′</strong><span>вместе до конца</span></div>
      <div class="stat-card"><strong>1</strong><span>rossoneri family</span></div>
    </div>
    <div class="section-head"><h2>История</h2></div>
    <div class="timeline">${(historyEntries.length ? historyEntries : [
      {period_label:'START', title:'Первый совместный просмотр', body:'Здесь будет год основания, место первого сбора и короткая история появления фан-клуба.'}
    ]).map(h=>`<div class="timeline-item"><div class="timeline-year">${esc(h.period_label)}</div><div class="timeline-copy"><strong>${esc(h.title)}</strong><p>${esc(h.body)}</p></div></div>`).join('')}</div>
  </section>`;
}

function renderMore() {
  return `<section class="page">
    <div class="eyebrow">Milan Club SPB</div>
    <h1 class="page-title">Ещё</h1>
    <p class="page-subtitle">Всё, что нужно вне матчей и просмотров.</p>
    <div class="more-grid">
      <button class="more-tile" data-route="bar"><span class="tile-icon">◉</span><div><strong>Наш бар</strong><span>Адрес, меню и matchday предложения</span></div></button>
      <button class="more-tile" data-route="contacts"><span class="tile-icon">↗</span><div><strong>Контакты</strong><span>Кому написать по просмотрам и членству</span></div></button>
      <button class="more-tile" data-route="club"><span class="tile-icon">◇</span><div><strong>История</strong><span>Люди и события Milan Club SPB</span></div></button>
      <button class="more-tile" data-route="profile"><span class="tile-icon">◎</span><div><strong>Мой профиль</strong><span>Карточка участника и посещения</span></div></button>
    </div>
  </section>`;
}

function renderBar() {
  const bar = getBar();
  if (editingBar) {
    return `<section class="page">
      <div class="eyebrow">Настройки площадки</div>
      <h1 class="page-title">Бар</h1>
      <p class="page-subtitle">Эти данные подставляются на главную и во все карточки совместных просмотров.</p>
      <form class="bar-form" id="barForm">
        <label><span>Название бара</span><input name="name" value="${esc(bar.name === defaultBar.name ? '' : bar.name)}" placeholder="Например, Match Point" required></label>
        <label><span>Адрес</span><input name="address" value="${esc(bar.address === defaultBar.address ? '' : bar.address)}" placeholder="Санкт-Петербург, улица, дом"></label>
        <label><span>Текст про сбор</span><input name="meeting" value="${esc(bar.meeting)}" placeholder="Сбор гостей за 60 минут до матча"></label>
        <label><span>Ссылка на карту</span><input name="mapUrl" value="${esc(bar.mapUrl)}" placeholder="https://..."></label>
        <div class="form-actions">
          <button type="submit" class="primary-btn">СОХРАНИТЬ БАР</button>
          <button type="button" class="secondary-wide" data-action="cancel-bar-edit">Отмена</button>
        </div>
      </form>
    </section>`;
  }

  return `<section class="page">
    <div class="eyebrow">Наш дом на matchday</div>
    <div class="bar-title-row">
      <h1 class="page-title">${esc(bar.name)}</h1>
      ${isAdmin() ? '<button class="edit-chip" data-action="edit-bar">Изменить</button>' : ''}
    </div>
    <p class="page-subtitle">${esc(bar.address)}<br>${esc(bar.meeting)}</p>
    <div class="bar-actions">
      ${bar.mapUrl ? `<a class="secondary-wide link-button" href="${esc(bar.mapUrl)}" target="_blank" rel="noopener">Открыть карту ↗</a>` : ''}
    </div>
    <div class="notice">${isAdmin() ? 'Вы вошли как администратор. Изменения сохраняются в общей базе и сразу видны всем участникам.' : 'Название, адрес и меню приходят из общей базы Milan Club. Редактирование доступно администраторам.'}</div>
    <div class="section-head"><h2>Меню</h2></div>
    ${Object.entries(menu).length ? Object.entries(menu).map(([section,items])=>`<div class="menu-section"><h3>${esc(section)}</h3><div class="menu-list">${items.map(i=>`<div class="menu-card"><div><strong>${esc(i[0])}</strong>${i[1]?`<span>${esc(i[1])}</span>`:''}</div><b>${esc(i[2])}</b></div>`).join('') || '<div class="notice">В этой категории пока пусто.</div>'}</div></div>`).join('') : '<div class="notice">Меню бара пока не добавлено.</div>'}
  </section>`;
}

function renderContacts() {
  return `<section class="page">
    <div class="eyebrow">Всегда на связи</div>
    <h1 class="page-title">Контакты</h1>
    <p class="page-subtitle">Сюда подставим реальные Telegram-ссылки и роли организаторов.</p>
    <div class="contact-list">${contacts.map(c=>`<article class="contact-card"><div class="avatar">${esc(c.initials)}</div><div class="contact-copy"><strong>${esc(c.name)}</strong><span>${esc(c.role)}</span></div><button data-action="contact" data-url="${esc(c.telegramUrl || '')}">Написать</button></article>`).join('') || '<div class="notice">Контакты пока не добавлены.</div>'}</div>
  </section>`;
}

function renderProfile() {
  const tgUser = TelegramBridge.user();
  const name = esc(TelegramBridge.fullName());
  const username = tgUser?.username ? `@${esc(tgUser.username)}` : (TelegramBridge.isInsideTelegram() ? 'Telegram подключён' : 'Откройте приложение из Telegram');
  const memberNumber = memberState?.profile?.member_number ? String(memberState.profile.member_number).padStart(4,'0') : '—';
  const visits = memberState?.rsvps?.filter(r => r.status === 'going').length || 0;
  const photo = tgUser?.photo_url ? `<img class="profile-hero-photo" src="${esc(tgUser.photo_url)}" alt="">` : `<div class="profile-hero-fallback">${name.charAt(0).toUpperCase()}</div>`;
  return `<section class="page">
    <div class="eyebrow">Rossoneri ID</div>
    <h1 class="page-title">Профиль</h1>
    <p class="page-subtitle">Telegram-профиль подставляется автоматически при запуске Mini App.</p>
    <article class="profile-card">
      <div class="profile-identity">${photo}<div><div class="member-number">Milan Club San Pietroburgo · #${memberNumber}</div><div class="member-name">${name}</div><div class="member-handle">${username}</div></div></div>
      <div class="stats-grid">
        <div class="stat-card"><strong>${visits}</strong><span>просмотров</span></div>
        <div class="stat-card"><strong>—</strong><span>любимый игрок</span></div>
      </div>
      <div style="margin-top:18px"><span style="font-size:11px;color:var(--muted)">Путь участника</span><div class="progress"><span></span></div></div>
      <div class="notice">${memberState?.profile ? (isAdmin() ? 'Telegram подтверждён · режим администратора' : 'Telegram подтверждён · профиль участника') : 'Профиль появится после защищённой Telegram-авторизации.'}</div>
      ${memberState?.admin_setup_available && !isAdmin() ? `
        <form class="bar-form admin-claim-form" id="adminClaimForm">
          <label><span>Одноразовый код администратора</span><input name="code" autocomplete="one-time-code" placeholder="MILAN-XXXXXXXX" required></label>
          <button type="submit" class="primary-btn">АКТИВИРОВАТЬ АДМИНА</button>
        </form>
      ` : ''}
      ${isAdmin() ? '<button class="secondary-wide" data-route="bar" style="margin-top:12px">НАСТРОИТЬ БАР →</button>' : ''}
    </article>
  </section>`;
}

const routes = { home:renderHome, matches:renderMatches, watch:renderWatch, club:renderClub, more:renderMore, bar:renderBar, contacts:renderContacts, profile:renderProfile };

function render(route=currentRoute, {push=true}={}) {
  const nextRoute = routes[route] ? route : 'home';
  if (push && nextRoute !== currentRoute) {
    routeStack.push(nextRoute);
    if (routeStack.length > 20) routeStack.shift();
  }
  currentRoute = nextRoute;
  app.innerHTML = (routes[nextRoute] || renderHome)();
  document.querySelectorAll('.nav-item').forEach(b => b.classList.toggle('active', b.dataset.route===nextRoute));
  TelegramBridge.showBack(nextRoute !== 'home');
  TelegramBridge.applyProfileChip();
  window.scrollTo({top:0, behavior:'instant'});
}

function goBack() {
  if (currentRoute === 'home') return;
  routeStack.pop();
  const previous = routeStack[routeStack.length - 1] || 'home';
  render(previous, {push:false});
}
TelegramBridge.onBack(goBack);

function toast(message) {
  let el = document.querySelector('.toast');
  if(!el){ el=document.createElement('div'); el.className='toast'; document.body.appendChild(el); }
  el.textContent=message; el.classList.add('show'); clearTimeout(window.__toast); window.__toast=setTimeout(()=>el.classList.remove('show'),1800);
}

document.addEventListener('click', async e => {
  const route = e.target.closest('[data-route]');
  if(route){ TelegramBridge.haptic(); render(route.dataset.route); return; }
  const f = e.target.closest('[data-filter]');
  if(f){ TelegramBridge.haptic(); filter=f.dataset.filter; render('matches', {push:false}); return; }
  const action = e.target.closest('[data-action]')?.dataset.action;
  if(action==='rsvp'){
    const button = e.target.closest('[data-action="rsvp"]');
    const partyId = button?.dataset.partyId || activePartyId();
    if (!partyId) { toast('Просмотр пока не опубликован'); return; }
    if (!Backend?.rsvp || !TelegramBridge.isInsideTelegram()) { toast('Откройте приложение из Telegram'); return; }
    button.disabled = true;
    try {
      const nextStatus = joined(partyId) ? 'cancelled' : 'going';
      await Backend.rsvp(partyId, nextStatus, 0);
      TelegramBridge.haptic(nextStatus==='going'?'success':'selection');
      await Promise.all([refreshMemberState(), refreshPublicData()]);
      toast(nextStatus==='going'?'Вы добавлены в список просмотра':'Вы отменили участие');
    } catch (error) {
      TelegramBridge.haptic('error');
      toast(error?.message || 'Не удалось обновить участие');
      button.disabled = false;
    }
  }
  if(action==='edit-bar'){ if (!isAdmin()) { toast('Нужны права администратора'); return; } editingBar = true; render('bar'); }
  if(action==='cancel-bar-edit'){ editingBar = false; render('bar'); }
  if(action==='contact') {
    TelegramBridge.haptic();
    const url = e.target.closest('[data-action="contact"]')?.dataset.url;
    if (url) TelegramBridge.open(url);
    else toast('Telegram-контакт пока не добавлен');
  }
});

document.addEventListener('submit', async e => {
  if (e.target.id === 'adminClaimForm') {
    e.preventDefault();
    const code = String(new FormData(e.target).get('code') || '').trim();
    if (!code || !Backend?.claimAdmin) return;
    const button = e.target.querySelector('button[type="submit"]');
    if (button) button.disabled = true;
    try {
      const result = await Backend.claimAdmin(code);
      memberState = { ...(memberState || {}), profile: result.profile, admin_setup_available: false };
      TelegramBridge.haptic('success');
      render('profile', {push:false});
      toast('Режим администратора активирован');
    } catch (error) {
      TelegramBridge.haptic('error');
      toast(error?.message || 'Не удалось активировать администратора');
      if (button) button.disabled = false;
    }
    return;
  }

  if(e.target.id !== 'barForm') return;
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target).entries());
  const venue = {
    id: getBar().id,
    name: (data.name || '').trim() || defaultBar.name,
    address: (data.address || '').trim() || defaultBar.address,
    meeting: (data.meeting || '').trim() || defaultBar.meeting,
    mapUrl: (data.mapUrl || '').trim()
  };
  if (!isAdmin() || !Backend?.updateVenue || !venue.id) {
    toast('Нужны права администратора');
    return;
  }
  try {
    await Backend.updateVenue(venue);
    editingBar = false;
    TelegramBridge.haptic('success');
    await refreshPublicData();
    render('bar', {push:false});
    toast('Бар сохранён для всех');
  } catch (error) {
    TelegramBridge.haptic('error');
    toast(error?.message || 'Не удалось сохранить бар');
  }
});

render('home', {push:false});
TelegramBridge.applyProfileChip();
refreshPublicData();
refreshMemberState();
