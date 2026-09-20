const TelegramBridge = window.MilanTelegram || {
  init(){}, user(){ return null; }, fullName(){ return 'Milanista'; }, isInsideTelegram(){ return false; },
  showBack(){}, onBack(){}, haptic(){}, open(url){ if (url) window.open(url, '_blank', 'noopener'); }, applyProfileChip(){}
};
TelegramBridge.init();

const CLUB_NAME = 'AC Milan Club San Pietroburgo';
let clubSettings = {
  club_name: CLUB_NAME,
  subtitle: 'Sempre con te sarò · Sempre rossonero'
};

const TEAM_LOGOS = {
  'AC Milan': 'assets/clubs/ac-milan.png',
  'Milan': 'assets/clubs/ac-milan.png',
  'Lecce': 'assets/clubs/lecce.png',
  'US Lecce': 'assets/clubs/lecce.png',
  'Sassuolo': 'assets/clubs/sassuolo.png',
  'US Sassuolo': 'assets/clubs/sassuolo.png',
  'Salzburg': 'assets/clubs/salzburg.png',
  'Red Bull Salzburg': 'assets/clubs/salzburg.png',
  'Atalanta': 'assets/clubs/atalanta.png',
  'Atalanta BC': 'assets/clubs/atalanta.png',
  'Bournemouth': 'assets/clubs/bournemouth.png',
  'AFC Bournemouth': 'assets/clubs/bournemouth.png',
  'Udinese': 'assets/clubs/udinese.png',
  'Udinese Calcio': 'assets/clubs/udinese.png',
  'Bologna': 'assets/clubs/bologna.png',
  'Bologna FC 1909': 'assets/clubs/bologna.png',
  'Inter': 'assets/clubs/inter.png',
  'Inter Milan': 'assets/clubs/inter.png',
  'Genoa': 'assets/clubs/genoa.png',
  'Genoa CFC': 'assets/clubs/genoa.png',
  'Frosinone': 'assets/clubs/frosinone.png',
  'Frosinone Calcio': 'assets/clubs/frosinone.png',
  'Olympiacos': 'assets/clubs/olympiacos.png',
  'Olympiacos Piraeus': 'assets/clubs/olympiacos.png',
  'Sunderland': 'assets/clubs/sunderland.png',
  'Sunderland AFC': 'assets/clubs/sunderland.png',
  'Levski Sofia': 'assets/clubs/levski-sofia.png',
  'Ferencváros': 'assets/clubs/ferencvaros.png',
  'Ferencvaros': 'assets/clubs/ferencvaros.png',
  'Ferencvárosi TC': 'assets/clubs/ferencvaros.png',
  'Ararat-Armenia': 'https://upload.wikimedia.org/wikipedia/commons/1/11/Ararat-Armenia.png'
};

const TEAM_DISPLAY = {
  'AC Milan': 'Милан',
  'Milan': 'Милан',
  'Lecce': 'Лечче',
  'US Lecce': 'Лечче',
  'Sassuolo': 'Сассуоло',
  'US Sassuolo': 'Сассуоло',
  'Salzburg': 'Ред Булл',
  'Red Bull Salzburg': 'Ред Булл',
  'Atalanta': 'Аталанта',
  'Atalanta BC': 'Аталанта',
  'Bournemouth': 'Борнмут',
  'AFC Bournemouth': 'Борнмут',
  'Udinese': 'Удинезе',
  'Udinese Calcio': 'Удинезе',
  'Bologna': 'Болонья',
  'Bologna FC 1909': 'Болонья',
  'Inter': 'Интер',
  'Inter Milan': 'Интер',
  'Genoa': 'Дженоа',
  'Genoa CFC': 'Дженоа',
  'Frosinone': 'Фрозиноне',
  'Frosinone Calcio': 'Фрозиноне',
  'Olympiacos': 'Олимпиакос',
  'Olympiacos Piraeus': 'Олимпиакос',
  'Sunderland': 'Сандерленд',
  'Sunderland AFC': 'Сандерленд',
  'Levski Sofia': 'Левски',
  'Ferencváros': 'Ференцварош',
  'Ferencvaros': 'Ференцварош',
  'Ferencvárosi TC': 'Ференцварош',
  'Ararat-Armenia': 'Арарат-Армения'
};

const ICONS = {
  arrowRight: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 7l5 5-5 5"/></svg>',
  arrowUpRight: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8"/></svg>',
  pin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s6-5.4 6-11a6 6 0 1 0-12 0c0 5.6 6 11 6 11Z"/><circle cx="12" cy="10" r="2.2"/></svg>',
  message: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5.5h14v10H9l-4 3v-13Z"/></svg>',
  history: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 8.5A8 8 0 1 1 4 14"/><path d="M4.5 4.5v4h4M12 8v4.5l3 2"/></svg>',
  user: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3.5"/><path d="M5.5 20c.7-3.4 3.2-5.4 6.5-5.4s5.8 2 6.5 5.4"/></svg>',
  settings: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M19 13.7v-3.4l-2-.7-.6-1.5.9-1.9-2.4-2.4-1.9.9-1.5-.6-.7-2H9.2l-.7 2-1.5.6-1.9-.9-2.4 2.4.9 1.9-.6 1.5-2 .7v3.4l2 .7.6 1.5-.9 1.9 2.4 2.4 1.9-.9 1.5.6.7 2h3.4l.7-2 1.5-.6 1.9.9 2.4-2.4-.9-1.9.6-1.5 2-.7Z"/></svg>',
  edit: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 16-.8 3.8L8 19l9.8-9.8-3-3L5 16Z"/><path d="m13.8 7.2 3 3"/></svg>',
  check: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.2 4.2L19 7"/></svg>'
};

function icon(name, className='') {
  return `<span class="ui-icon ${className}">${ICONS[name] || ''}</span>`;
}
function clubName() { return clubSettings?.club_name || CLUB_NAME; }
function displayTeam(name='') { return TEAM_DISPLAY[name] || name; }
function competitionName(name='') {
  const raw = String(name || '');
  if (raw.startsWith('Serie A') || raw.startsWith('Италия. Серия А')) return 'Италия. Серия А';
  if (raw.startsWith('Europa League') || raw.startsWith('Лига Европы')) return 'Лига Европы';
  return raw;
}
function competitionShort(name='') {
  const translated = competitionName(name);
  if (translated === 'Италия. Серия А') return 'СЕРИЯ А';
  if (translated === 'Лига Европы') return 'ЛИГА ЕВРОПЫ';
  return translated.toUpperCase();
}
function tournamentWithRound(name='', round='') {
  return [competitionName(name), round].filter(Boolean).join(' · ');
}
function teamInitials(name='') {
  return displayTeam(name).split(/\s+/).filter(Boolean).map(x => x[0]).join('').slice(0,3).toUpperCase();
}
function crest(name, size='lg') {
  const src = TEAM_LOGOS[name] || '';
  const fallback = esc(teamInitials(name));
  if (!src) return `<span class="club-crest club-crest--${size}"><span class="crest-fallback">${fallback}</span></span>`;
  return `<span class="club-crest club-crest--${size}"><img src="${esc(src)}" alt="${esc(displayTeam(name))}" loading="lazy" onerror="this.hidden=true;this.nextElementSibling.hidden=false"><span class="crest-fallback" hidden>${fallback}</span></span>`;
}

let fixtures = [
  {date:'20', month:'сен', iso:'2026-09-20', home:'AC Milan', away:'Lecce', competition:'Италия. Серия А · 5 тур', time:'21:45 МСК', watched:true, status:'ПРОСМОТР'},
  {date:'10/11', month:'окт', iso:'2026-10-10', home:'Sassuolo', away:'AC Milan', competition:'Италия. Серия А · 6 тур', time:'время уточняется', watched:false, status:''},
  {date:'15', month:'окт', iso:'2026-10-15', home:'Salzburg', away:'AC Milan', competition:'Лига Европы · 2 тур', time:'19:45 МСК', watched:true, status:'ПРОСМОТР'},
  {date:'17/18', month:'окт', iso:'2026-10-17', home:'AC Milan', away:'Atalanta', competition:'Италия. Серия А · 7 тур', time:'время уточняется', watched:true, status:'ПРОСМОТР'},
  {date:'22', month:'окт', iso:'2026-10-22', home:'Bournemouth', away:'AC Milan', competition:'Лига Европы · 3 тур', time:'22:00 МСК', watched:true, status:'ПРОСМОТР'},
  {date:'24/25', month:'окт', iso:'2026-10-24', home:'Udinese', away:'AC Milan', competition:'Италия. Серия А · 8 тур', time:'время уточняется', watched:false, status:''},
  {date:'28', month:'окт', iso:'2026-10-28', home:'AC Milan', away:'Bologna', competition:'Италия. Серия А · 9 тур', time:'время уточняется', watched:true, status:'ПРОСМОТР'},
  {date:'31/01', month:'окт/ноя', iso:'2026-10-31', home:'AC Milan', away:'Inter', competition:'Италия. Серия А · Дерби', time:'время уточняется', watched:true, status:'ПРОСМОТР'}
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
  {name:'AC Milan Club San Pietroburgo', role:'Членство и мероприятия', initials:'M'}
];

let remoteBar = null;
let venues = [];
let historyEntries = [];
let watchParties = [];
let menuCategories = [];
let menuItems = [];
let memberState = null;
let selectedWatchPartyId = null;
const participantState = new Map();
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
function getVenue(id) {
  if (id) {
    const venue = venues.find(v => v.id === id);
    if (venue) return {...defaultBar, ...venue};
  }
  return getBar();
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
function memberRank(visits = 0) {
  if (visits >= 100) return {name:'Leggenda', note:'100+ просмотров'};
  if (visits >= 61) return {name:'Senatore', note:'61–99 просмотров'};
  if (visits >= 31) return {name:'Rossonero', note:'31–60 просмотров'};
  if (visits >= 11) return {name:'Milanista', note:'11–30 просмотров'};
  return {name:'Nuovo', note:'0–10 просмотров'};
}
function selectedWatchParty(parties = fixtures.filter(f => f.watched && f.partyId)) {
  return parties.find(f => f.partyId === selectedWatchPartyId) || parties[0] || null;
}
function participantAvatarLabel(participant) {
  const source = participant?.username || participant?.name || participant?.display_name || 'M';
  return String(source).replace(/^@/,'').trim().charAt(0).toUpperCase() || 'M';
}
function attendanceLabel(status) {
  if (status === 'attended') return 'Был';
  if (status === 'absent') return 'Не был';
  return 'Не отмечен';
}
async function loadWatchParticipants(partyId, {force=false}={}) {
  if (!partyId || !Backend?.watchParticipants || !TelegramBridge.isInsideTelegram()) return;
  const current = participantState.get(partyId);
  if (!force && (current?.loading || current?.loaded)) return;

  participantState.set(partyId, {loading:true, loaded:false, items:current?.items || [], error:''});
  if (currentRoute === 'watch') render('watch', {push:false});

  try {
    const result = await Backend.watchParticipants(partyId);
    participantState.set(partyId, {
      loading:false,
      loaded:true,
      items:Array.isArray(result.participants) ? result.participants : [],
      canManage:Boolean(result.can_manage_attendance),
      error:''
    });
  } catch (error) {
    participantState.set(partyId, {
      loading:false,
      loaded:true,
      items:[],
      canManage:false,
      error:error?.message || 'Не удалось загрузить участников'
    });
  }

  if (currentRoute === 'watch' && selectedWatchParty(partiesForWatch())?.partyId === partyId) {
    render('watch', {push:false});
  }
}
function partiesForWatch() {
  return fixtures.filter(f => f.watched && f.partyId);
}

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
  if (data.settings && typeof data.settings === 'object') {
    clubSettings = {...clubSettings, ...data.settings};
  }
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
        competition:tournamentWithRound(m.competition,m.round_label),
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

  venues = Array.isArray(data.venues) ? data.venues.map(v => ({
    id:v.id,
    name:v.name,
    address:v.address,
    meeting:v.meeting_note,
    mapUrl:v.map_url || '',
    menuUrl:v.menu_url || '',
    menuNote:v.menu_note || '',
    sortOrder:v.sort_order ?? 100
  })) : [];
  if (venues.length) remoteBar = venues[0];

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
    menuCategories = data.menu_categories;
    menuItems = Array.isArray(data.menu_items) ? data.menu_items : [];
    const nextMenu = {};
    for (const category of menuCategories) {
      const items = menuItems
        .filter(i => i.category_id === category.id)
        .map(i => [i.name, i.volume || i.description || '', i.price_rub == null ? '' : `${i.price_rub} ₽`]);
      nextMenu[category.name] = items;
    }
    menu = nextMenu;
  }

  remoteLoaded = true;
}

async function refreshPublicData({renderAfter=true}={}) {
  if (!Backend?.publicBootstrap) return false;
  try {
    const data = await Backend.publicBootstrap();
    applyRemoteData(data);
    if (renderAfter) render(currentRoute, {push:false});
    return true;
  } catch (error) {
    console.warn('Milan Club bootstrap failed', error);
    return false;
  }
}

async function refreshMemberState({renderAfter=true}={}) {
  if (!Backend?.me || !TelegramBridge.isInsideTelegram()) return false;
  try {
    memberState = await Backend.me();
    if (renderAfter) render(currentRoute, {push:false});
    return true;
  } catch (error) {
    console.warn('Milan Club member API unavailable', error);
    return false;
  }
}

function renderHome() {
  const next = fixtures[0];
  if (!next) return '<section class="page"><div class="notice">Календарь пока не загружен.</div></section>';
  const timeMain = next.time.includes('МСК') ? next.time.replace(' МСК','') : next.time;
  return `
  <section class="page home-page">
    <div class="eyebrow">${esc(clubName())}</div>
    <h1 class="page-title home-manifesto"><span>Sempre con te sarò</span><span>Sempre rossonero</span></h1>
    <p class="page-subtitle">Совместные просмотры и жизнь AC Milan Club San Pietroburgo в одном месте!</p>

    <article class="hero">
      <img class="hero-club-watermark" src="assets/milan-club-logo-dark.webp" alt="" aria-hidden="true">
      <div class="hero-top"><span class="competition">${competitionShort(next.competition)}</span><span class="live-badge">Ближайший матч</span></div>
      <div class="versus">
        <div class="team">${crest(next.home,'hero')}<strong>${esc(displayTeam(next.home))}</strong></div>
        <div class="match-time"><strong>${esc(timeMain)}</strong><span>${next.date} ${next.month}${next.time.includes('МСК') ? ' · МСК' : ''}</span></div>
        <div class="team">${crest(next.away,'hero')}<strong>${esc(displayTeam(next.away))}</strong></div>
      </div>
      <div class="hero-meta">${next.watched ? `${esc(getVenue(next.venueId).name)} · ${esc(getVenue(next.venueId).meeting)}` : 'Совместный просмотр пока не опубликован'}</div>
      <div class="hero-actions">
        ${next.watched
          ? `<button class="primary-btn premium-btn ${joined(next.partyId) ? 'joined' : ''}" data-action="rsvp" data-party-id="${esc(next.partyId)}">${joined(next.partyId) ? `${icon('check')}<span>Я ИДУ</span>` : '<span>ИДУ НА ПРОСМОТР</span>'}</button>`
          : '<button class="primary-btn premium-btn joined" type="button" disabled><span>ЖДЁМ АНОНС ПРОСМОТРА</span></button>'}
        <button class="secondary-btn icon-only-btn" data-route="watch" aria-label="Подробнее">${icon('arrowUpRight')}</button>
      </div>
    </article>

    <div class="section-head"><h2>Ближайшие матчи</h2><button class="text-btn premium-text-btn" data-route="matches"><span>Все</span>${icon('arrowRight')}</button></div>
    <div class="horizontal-cards">${fixtures.slice(1,5).map(matchCard).join('')}</div>

    <div class="section-head"><h2>${esc(clubName())}</h2><button class="text-btn premium-text-btn" data-route="club"><span>История</span>${icon('arrowRight')}</button></div>
    <article class="club-teaser" data-route="club">
      <img class="club-teaser-logo" src="assets/milan-club-logo-dark.webp" alt="" aria-hidden="true">
      <span class="eyebrow">AC Milan Club San Pietroburgo</span>
      <div class="big-copy">Больше, чем просто фан-клуб</div>
      <p>Мы большая красно-чёрная семья из города на Неве.</p>
    </article>
  </section>`;
}

function matchCard(f) {
  return `<article class="match-card" data-route="matches">
    <div class="match-card-top"><span>${esc(f.competition)}</span><span>${f.date} ${f.month}</span></div>
    <div class="match-card-clubs">
      <div class="mini-team">${crest(f.home,'sm')}<span>${esc(displayTeam(f.home))}</span></div>
      <span class="match-dash">—</span>
      <div class="mini-team mini-team-away">${crest(f.away,'sm')}<span>${esc(displayTeam(f.away))}</span></div>
    </div>
    <div class="match-card-bottom"><strong>${esc(f.time)}</strong>${f.watched?'<span class="watch-pill">● просмотр</span>':''}</div>
  </article>`;
}

function renderMatches() {
  const filtered = fixtures.filter(f => filter==='Все' || (filter==='Серия А' ? f.competition.startsWith('Италия. Серия А') : f.competition.startsWith('Лига Европы')));
  return `<section class="page">
    <div class="eyebrow">${esc(clubName())}</div>
    <h1 class="page-title">Матчи</h1>
    <p class="page-subtitle">Время указано по Москве. Точный слот обновляется в календаре после публикации лигой.</p>
    <div class="filter-row">${['Все','Серия А','Лига Европы'].map(x=>`<button class="filter premium-filter ${filter===x?'active':''}" data-filter="${x}">${x}</button>`).join('')}</div>
    <div class="fixture-list">${filtered.map(f=>`
      <article class="fixture">
        <div class="fixture-date"><strong>${f.date}</strong><span>${f.month}</span></div>
        <div class="fixture-main">
          <div class="fixture-clubs">
            ${crest(f.home,'xs')}<strong>${esc(displayTeam(f.home))}</strong><span class="fixture-vs">—</span>${crest(f.away,'xs')}<strong>${esc(displayTeam(f.away))}</strong>
          </div>
          <span>${esc(f.competition)}</span>
        </div>
        <div class="fixture-side"><strong>${esc(f.time)}</strong>${f.watched?'<span>● ПРОСМОТР</span>':''}</div>
      </article>`).join('')}</div>
  </section>`;
}

function renderWatch() {
  const parties = partiesForWatch();
  if (!parties.length) {
    return `<section class="page">
      <div class="eyebrow">${esc(clubName())}</div>
      <h1 class="page-title">Просмотры</h1>
      <p class="page-subtitle">Как только организаторы опубликуют совместный просмотр, он появится здесь у всех участников.</p>
      <div class="notice">Сейчас активных просмотров нет. Матчи продолжают отображаться в календаре.</div>
    </section>`;
  }

  const first = selectedWatchParty(parties);
  if (!selectedWatchPartyId) selectedWatchPartyId = first.partyId;
  const bar = getVenue(first.venueId);
  const participants = participantState.get(first.partyId) || {loading:true, loaded:false, items:[], canManage:false, error:''};
  const otherParties = parties.filter(p => p.partyId !== first.partyId);

  return `<section class="page">
    <div class="eyebrow">${esc(clubName())}</div>
    <h1 class="page-title">Просмотры</h1>
    <p class="page-subtitle">Все совместные матчи фан-клуба: где встречаемся, когда приходить и кто уже идёт.</p>

    <article class="watch-feature">
      <div>
        <span class="eyebrow">${first.date} ${first.month} · ${esc(first.competition)}</span>
        <div class="watch-match-row">
          <div class="watch-team">${crest(first.home,'hero')}<strong>${esc(displayTeam(first.home))}</strong></div>
          <div class="watch-vs">vs</div>
          <div class="watch-team">${crest(first.away,'hero')}<strong>${esc(displayTeam(first.away))}</strong></div>
        </div>
        <p>${esc(bar.name)} · Санкт-Петербург<br>${esc(bar.address)}<br>${esc(bar.meeting)} · Начало: ${esc(first.time)}</p>
      </div>
      <div>
        <div class="watch-stats">
          <div class="watch-stat"><strong>${first.attendeeCount || 0}</strong><span>уже идут</span></div>
          <div class="watch-stat"><strong>${first.capacity || '∞'}</strong><span>мест</span></div>
          <div class="watch-stat"><strong>SPB</strong><span>наш город</span></div>
        </div>
        <button style="margin-top:10px" class="primary-btn premium-btn ${joined(first.partyId)?'joined':''}" data-action="rsvp" data-party-id="${esc(first.partyId)}">${joined(first.partyId)?`${icon('check')}<span>ВЫ В СПИСКЕ</span>`:'<span>ПРИСОЕДИНИТЬСЯ</span>'}</button>
      </div>
    </article>

    <div class="section-head participants-head">
      <h2>Участники</h2>
      <span class="participants-count">${participants.loaded ? participants.items.length : first.attendeeCount || 0}</span>
    </div>

    <div class="participants-list">
      ${participants.loading ? '<div class="participants-loading"><span></span><span></span><span></span></div>' : ''}
      ${participants.error ? `<div class="notice">${esc(participants.error)}</div>` : ''}
      ${!participants.loading && !participants.error && !participants.items.length ? '<div class="notice">Пока никто не записался на этот просмотр.</div>' : ''}
      ${participants.items.map(p => `
        <article class="participant-row">
          <div class="participant-avatar">${esc(participantAvatarLabel(p))}</div>
          <div class="participant-copy">
            <strong>${esc(p.display_name || p.name || 'Milanista')}</strong>
            ${p.name && p.display_name !== p.name ? `<span>${esc(p.name)}</span>` : ''}
            ${p.guests ? `<small>+${Number(p.guests)} ${Number(p.guests) === 1 ? 'гость' : 'гостя'}</small>` : ''}
          </div>
          ${participants.canManage ? `
            <div class="attendance-control" data-user-id="${esc(p.telegram_user_id)}">
              <button class="attendance-btn attendance-yes ${p.attendance_status === 'attended' ? 'active' : ''}" data-action="set-attendance" data-party-id="${esc(first.partyId)}" data-user-id="${esc(p.telegram_user_id)}" data-attendance="attended">Был</button>
              <button class="attendance-btn attendance-no ${p.attendance_status === 'absent' ? 'active' : ''}" data-action="set-attendance" data-party-id="${esc(first.partyId)}" data-user-id="${esc(p.telegram_user_id)}" data-attendance="absent">Не был</button>
              <span class="attendance-state">${esc(attendanceLabel(p.attendance_status))}</span>
            </div>
          ` : ''}
        </article>`).join('')}
    </div>

    <div class="section-head"><h2>Другие просмотры</h2></div>
    <div class="fixture-list">${otherParties.map(f=>`
      <article class="fixture fixture-clickable" data-action="open-watch-party" data-party-id="${esc(f.partyId)}">
        <div class="fixture-date"><strong>${f.date}</strong><span>${f.month}</span></div>
        <div class="fixture-main">
          <div class="fixture-clubs">${crest(f.home,'xs')}<strong>${esc(displayTeam(f.home))}</strong><span class="fixture-vs">—</span>${crest(f.away,'xs')}<strong>${esc(displayTeam(f.away))}</strong></div>
          <span>${esc(f.competition)} · ${esc(getVenue(f.venueId).name)}</span>
        </div>
        <div class="fixture-side"><strong>${esc(f.time)}</strong><span>● FAN CLUB</span></div>
      </article>`).join('') || '<div class="notice">Других просмотров пока не опубликовано.</div>'}</div>
  </section>`;
}

function renderClub() {
  return `<section class="page club-history-page">
    <div class="eyebrow">AC Milan Club San Pietroburgo</div>
    <h1 class="page-title">История</h1>
    <p class="page-subtitle">Красно-чёрная история нашего сообщества в Санкт-Петербурге.</p>

    <div class="timeline club-timeline">${(historyEntries.length ? historyEntries : [
      {period_label:'START', title:'Первый совместный просмотр', body:'Здесь будет год основания, место первого сбора и короткая история появления фан-клуба.'}
    ]).map(h=>`<div class="timeline-item"><div class="timeline-year">${esc(h.period_label)}</div><div class="timeline-copy"><strong>${esc(h.title)}</strong><p>${esc(h.body)}</p></div></div>`).join('')}</div>
  </section>`;
}

function renderMore() {
  return `<section class="page">
    <div class="eyebrow">${esc(clubName())}</div>
    <h1 class="page-title">Ещё</h1>
    <p class="page-subtitle">Всё, что нужно вне матчей и просмотров.</p>
    <div class="more-grid">
      <button class="more-tile premium-tile" data-route="bar"><span class="tile-icon">${icon('pin')}</span><div><strong>Наш бар</strong><span>Адрес, меню и matchday предложения</span></div>${icon('arrowUpRight','tile-arrow')}</button>
      <button class="more-tile premium-tile" data-route="contacts"><span class="tile-icon">${icon('message')}</span><div><strong>Контакты</strong><span>Кому написать по просмотрам и членству</span></div>${icon('arrowUpRight','tile-arrow')}</button>
      <button class="more-tile premium-tile" data-route="club"><span class="tile-icon">${icon('history')}</span><div><strong>История</strong><span>Люди и события ${esc(clubName())}</span></div>${icon('arrowUpRight','tile-arrow')}</button>
      <button class="more-tile premium-tile" data-route="profile"><span class="tile-icon">${icon('user')}</span><div><strong>Мой профиль</strong><span>Карточка участника и посещения</span></div>${icon('arrowUpRight','tile-arrow')}</button>
      ${isAdmin() ? `<button class="more-tile premium-tile admin-tile" data-route="admin"><span class="tile-icon">${icon('settings')}</span><div><strong>Админка</strong><span>Просмотры, меню, контакты и история</span></div>${icon('arrowUpRight','tile-arrow')}</button>` : ''}
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
        <label><span>Название бара</span><input name="name" value="${esc(bar.name === defaultBar.name ? '' : bar.name)}" placeholder="Например, Tara Brooch" required></label>
        <label><span>Адрес</span><input name="address" value="${esc(bar.address === defaultBar.address ? '' : bar.address)}" placeholder="Санкт-Петербург, улица, дом"></label>
        <label><span>Текст про сбор</span><input name="meeting" value="${esc(bar.meeting)}" placeholder="Сбор гостей за 60 минут до матча"></label>
        <label><span>Ссылка на карту</span><input name="mapUrl" value="${esc(bar.mapUrl)}" placeholder="https://..."></label>
        <label><span>Ссылка на меню</span><input name="menuUrl" value="${esc(bar.menuUrl || '')}" placeholder="https://.../menu.pdf"></label>
        <div class="form-actions">
          <button type="submit" class="primary-btn premium-btn"><span>СОХРАНИТЬ БАР</span></button>
          <button type="button" class="secondary-wide" data-action="cancel-bar-edit">Отмена</button>
        </div>
      </form>
    </section>`;
  }

  const list = venues.length ? venues : [bar];
  return `<section class="page">
    <div class="eyebrow">Matchday places</div>
    <div class="bar-title-row">
      <h1 class="page-title">Наши бары</h1>
      ${isAdmin() ? `<button class="edit-chip premium-chip" data-action="edit-bar">${icon('edit')}<span>Изменить</span></button>` : ''}
    </div>
    <p class="page-subtitle">Площадки AC Milan Club San Pietroburgo для совместных просмотров.</p>

    <div class="venue-list">
      ${list.map((venue, index) => `
        <article class="venue-card ${index === 0 ? 'venue-card-primary' : ''}">
          <div class="venue-card-head">
            <div>
              <span class="eyebrow">${index === 0 ? 'Основная площадка' : 'Площадка'}</span>
              <h2>${esc(venue.name)}</h2>
            </div>
            <span class="venue-number">0${index + 1}</span>
          </div>
          <p class="venue-address">${esc(venue.address)}</p>
          <p class="venue-meeting">${esc(venue.meeting)}</p>
          <div class="venue-actions">
            ${venue.mapUrl ? `<a class="secondary-wide link-button premium-link-btn" href="${esc(venue.mapUrl)}" target="_blank" rel="noopener"><span>На карте</span>${icon('arrowUpRight')}</a>` : ''}
            ${venue.menuUrl ? `<a class="secondary-wide link-button premium-link-btn venue-menu-btn" href="${esc(venue.menuUrl)}" target="_blank" rel="noopener"><span>Меню PDF</span>${icon('arrowUpRight')}</a>` : ''}
          </div>
        </article>`).join('')}
    </div>

    <div class="notice">${isAdmin() ? 'Площадки хранятся в общей базе. При создании просмотра можно выбрать конкретный бар.' : 'Площадка конкретного просмотра указывается в карточке матча после публикации события.'}</div>
  </section>`;
}

function renderContacts() {
  return `<section class="page">
    <div class="eyebrow">Всегда на связи</div>
    <h1 class="page-title">Контакты</h1>
    <p class="page-subtitle">Сюда подставим реальные Telegram-ссылки и роли организаторов.</p>
    <div class="contact-list">${contacts.map(c=>`<article class="contact-card"><div class="avatar">${esc(c.initials)}</div><div class="contact-copy"><strong>${esc(c.name)}</strong><span>${esc(c.role)}</span></div><button class="contact-action premium-chip" data-action="contact" data-url="${esc(c.telegramUrl || '')}">${icon('message')}<span>Написать</span></button></article>`).join('') || '<div class="notice">Контакты пока не добавлены.</div>'}</div>
  </section>`;
}

function renderAdmin() {
  if (!isAdmin()) {
    return `<section class="page"><div class="eyebrow">AC Milan Club San Pietroburgo</div><h1 class="page-title">Админка</h1><div class="notice">Нужны права администратора.</div></section>`;
  }

  const bar = getBar();
  const venueOptions = (venues.length ? venues : [bar]).map(v => `<option value="${esc(v.id || '')}">${esc(v.name)} · ${esc(v.address)}</option>`).join('');
  const matchOptions = fixtures.map(f => `<option value="${esc(f.id)}">${esc(displayTeam(f.home))} — ${esc(displayTeam(f.away))} · ${f.date} ${f.month} · ${esc(f.time)}</option>`).join('');
  const categoryOptions = menuCategories.map(c => `<option value="${esc(c.id)}">${esc(c.name)}</option>`).join('');

  return `<section class="page">
    <div class="eyebrow">Управление AC Milan Club San Pietroburgo</div>
    <h1 class="page-title">Админка</h1>
    <p class="page-subtitle">Все изменения сохраняются в общей базе и сразу появляются у всех участников.</p>

    <article class="admin-card">
      <h2>Совместный просмотр</h2>
      <form class="bar-form" id="adminWatchForm">
        <label><span>Матч</span><select name="match_id" required>${matchOptions}</select></label>
        <label><span>Площадка</span><select name="venue_id" required>${venueOptions}</select></label>
        <label><span>Лимит мест</span><input name="capacity" type="number" min="1" placeholder="Например, 60"></label>
        <label><span>Комментарий</span><input name="note" placeholder="Бронь столов, депозит, важная информация"></label>
        <label class="check-row"><input name="published" type="checkbox" checked><span>Опубликовать просмотр сразу</span></label>
        <button type="submit" class="primary-btn">СОХРАНИТЬ ПРОСМОТР</button>
      </form>
    </article>

    <article class="admin-card">
      <h2>Категория меню</h2>
      <form class="bar-form" id="adminCategoryForm">
        <label><span>Название</span><input name="name" placeholder="Пиво, Закуски, Горячее" required></label>
        <button type="submit" class="primary-btn">ДОБАВИТЬ КАТЕГОРИЮ</button>
      </form>
    </article>

    <article class="admin-card">
      <h2>Позиция меню</h2>
      <form class="bar-form" id="adminMenuItemForm">
        <label><span>Категория</span><select name="category_id" required>${categoryOptions || '<option value="">Сначала создайте категорию</option>'}</select></label>
        <label><span>Название</span><input name="name" required placeholder="Например, Guinness"></label>
        <label><span>Объём / подпись</span><input name="volume" placeholder="0,5 л"></label>
        <label><span>Цена, ₽</span><input name="price_rub" type="number" min="0" placeholder="690"></label>
        <button type="submit" class="primary-btn" ${categoryOptions ? '' : 'disabled'}>ДОБАВИТЬ ПОЗИЦИЮ</button>
      </form>
    </article>

    <article class="admin-card">
      <h2>Контакт</h2>
      <form class="bar-form" id="adminContactForm">
        <label><span>Имя</span><input name="name" required></label>
        <label><span>Роль</span><input name="role" placeholder="Организация просмотров"></label>
        <label><span>Telegram username</span><input name="telegram_username" placeholder="@username"></label>
        <button type="submit" class="primary-btn">ДОБАВИТЬ КОНТАКТ</button>
      </form>
    </article>

    <article class="admin-card">
      <h2>История фан-клуба</h2>
      <form class="bar-form" id="adminHistoryForm">
        <label><span>Год / период</span><input name="period_label" required placeholder="2018"></label>
        <label><span>Заголовок</span><input name="title" required placeholder="Первый большой просмотр"></label>
        <label><span>Текст</span><textarea name="body" rows="4" placeholder="Короткая история события"></textarea></label>
        <button type="submit" class="primary-btn">ДОБАВИТЬ В ИСТОРИЮ</button>
      </form>
    </article>

    <article class="admin-card admin-summary">
      <h2>Площадки</h2>
      <p>${(venues.length ? venues : [bar]).map(v => `<strong>${esc(v.name)}</strong><br>${esc(v.address)}`).join('<br><br>')}</p>
      <button class="secondary-wide premium-link-btn" data-route="bar"><span>Изменить бар</span>${icon('arrowRight')}</button>
    </article>
  </section>`;
}

function renderProfile() {
  const tgUser = TelegramBridge.user();
  const name = esc(TelegramBridge.fullName());
  const username = tgUser?.username ? `@${esc(tgUser.username)}` : (TelegramBridge.isInsideTelegram() ? 'Telegram подключён' : 'Откройте приложение из Telegram');
  const memberNumber = memberState?.profile?.member_number ? String(memberState.profile.member_number).padStart(4,'0') : '—';
  const visits = memberState?.rsvps?.filter(r => r.attendance_status === 'attended').length || 0;
  const rank = memberRank(visits);
  const fanSinceYear = memberState?.profile?.fan_since_year || '';
  const currentYear = new Date().getFullYear();
  const photo = tgUser?.photo_url ? `<img class="profile-hero-photo" src="${esc(tgUser.photo_url)}" alt="">` : `<div class="profile-hero-fallback">${name.charAt(0).toUpperCase()}</div>`;
  return `<section class="page">
    <div class="eyebrow">Rossoneri ID</div>
    <h1 class="page-title">Профиль</h1>
    <article class="profile-card">
      <div class="profile-identity">${photo}<div><div class="member-number">AC Milan Club San Pietroburgo · #${memberNumber}</div><div class="member-name">${name}</div><div class="member-handle">${username}</div></div></div>
      <div class="stats-grid profile-stats-grid">
        <div class="stat-card"><strong>${visits}</strong><span>просмотров</span></div>
        <form class="stat-card fan-since-stat" id="fanSinceForm">
          <div class="fan-since-value">
            <input name="fan_since_year" type="number" inputmode="numeric" min="1899" max="${currentYear}" value="${esc(fanSinceYear)}" placeholder="—" aria-label="Год, с которого болеете за Milan">
            <button type="submit" class="fan-since-save" aria-label="Сохранить год">${icon('check')}</button>
          </div>
          <span>болею с</span>
        </form>
      </div>
      <div class="member-rank-card">
        <div><span>Ранг</span><strong>${esc(rank.name)}</strong></div>
        <small>${esc(rank.note)}</small>
      </div>
      <div class="notice">${memberState?.profile ? (isAdmin() ? 'Telegram подтверждён · режим администратора' : 'Telegram подтверждён · профиль участника') : 'Профиль появится после защищённой Telegram-авторизации.'}</div>
      ${memberState?.admin_setup_available && !isAdmin() ? `
        <form class="bar-form admin-claim-form" id="adminClaimForm">
          <label><span>Одноразовый код администратора</span><input name="code" autocomplete="one-time-code" placeholder="MILAN-XXXXXXXX" required></label>
          <button type="submit" class="primary-btn">АКТИВИРОВАТЬ АДМИНА</button>
        </form>
      ` : ''}
      ${isAdmin() ? `<button class="secondary-wide premium-link-btn" data-route="bar" style="margin-top:12px"><span>Настроить бар</span>${icon('arrowRight')}</button>` : ''}
    </article>
  </section>`;
}

const routes = { home:renderHome, matches:renderMatches, watch:renderWatch, club:renderClub, more:renderMore, bar:renderBar, contacts:renderContacts, admin:renderAdmin, profile:renderProfile };

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
  if (nextRoute === 'watch') {
    const party = selectedWatchParty(partiesForWatch());
    if (party?.partyId) window.setTimeout(() => loadWatchParticipants(party.partyId), 0);
  }
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
  const actionEl = e.target.closest('[data-action]');
  const action = actionEl?.dataset.action;

  if(action==='open-watch-party'){
    const partyId = actionEl?.dataset.partyId;
    if (partyId) {
      selectedWatchPartyId = partyId;
      TelegramBridge.haptic();
      render('watch', {push:false});
    }
    return;
  }

  if(action==='set-attendance'){
    if (!isAdmin() || !Backend?.setAttendance) { toast('Нужны права администратора'); return; }
    const partyId = actionEl?.dataset.partyId;
    const userId = Number(actionEl?.dataset.userId);
    const attendance = actionEl?.dataset.attendance;
    if (!partyId || !Number.isSafeInteger(userId) || !['attended','absent'].includes(attendance)) return;

    const row = actionEl.closest('.participant-row');
    row?.querySelectorAll('button').forEach(button => button.disabled = true);
    try {
      await Backend.setAttendance(partyId, userId, attendance);
      TelegramBridge.haptic('success');
      participantState.delete(partyId);
      await Promise.all([
        loadWatchParticipants(partyId, {force:true}),
        refreshMemberState({renderAfter:false})
      ]);
      render('watch', {push:false});
      toast(attendance === 'attended' ? 'Отмечено: был' : 'Отмечено: не был');
    } catch (error) {
      TelegramBridge.haptic('error');
      toast(error?.message || 'Не удалось отметить посещение');
      row?.querySelectorAll('button').forEach(button => button.disabled = false);
    }
    return;
  }

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
      participantState.delete(partyId);
      await Promise.all([
        refreshMemberState({renderAfter:false}),
        refreshPublicData({renderAfter:false}),
        loadWatchParticipants(partyId, {force:true})
      ]);
      render(currentRoute, {push:false});
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
  if (e.target.id === 'fanSinceForm') {
    e.preventDefault();
    const year = Number(new FormData(e.target).get('fan_since_year'));
    const currentYear = new Date().getFullYear();

    if (!Number.isInteger(year) || year < 1899 || year > currentYear) {
      TelegramBridge.haptic('error');
      toast('Укажите корректный год');
      return;
    }
    if (!Backend?.updateProfile || !TelegramBridge.isInsideTelegram()) {
      toast('Откройте приложение из Telegram');
      return;
    }

    const button = e.target.querySelector('button[type="submit"]');
    if (button) button.disabled = true;
    try {
      const result = await Backend.updateProfile({fan_since_year: year});
      memberState = {...(memberState || {}), profile: result.profile};
      TelegramBridge.haptic('success');
      render('profile', {push:false});
      toast('Год сохранён');
    } catch (error) {
      TelegramBridge.haptic('error');
      toast(error?.message || 'Не удалось сохранить год');
      if (button) button.disabled = false;
    }
    return;
  }

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

  if (e.target.id === 'adminWatchForm') {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries());
    try {
      await Backend.saveWatchParty({
        match_id: data.match_id,
        venue_id: data.venue_id || getBar().id,
        capacity: data.capacity || null,
        note: data.note || '',
        published: new FormData(e.target).has('published')
      });
      TelegramBridge.haptic('success');
      await refreshPublicData();
      render('admin', {push:false});
      toast('Просмотр сохранён');
    } catch (error) {
      TelegramBridge.haptic('error');
      toast(error?.message || 'Не удалось сохранить просмотр');
    }
    return;
  }

  if (e.target.id === 'adminCategoryForm') {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries());
    try {
      await Backend.saveMenuCategory({ venue_id:getBar().id, name:data.name });
      TelegramBridge.haptic('success');
      await refreshPublicData();
      render('admin', {push:false});
      toast('Категория добавлена');
    } catch (error) { TelegramBridge.haptic('error'); toast(error?.message || 'Ошибка'); }
    return;
  }

  if (e.target.id === 'adminMenuItemForm') {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries());
    try {
      await Backend.saveMenuItem({
        category_id:data.category_id,
        name:data.name,
        volume:data.volume || '',
        price_rub:data.price_rub || null
      });
      TelegramBridge.haptic('success');
      await refreshPublicData();
      render('admin', {push:false});
      toast('Позиция добавлена');
    } catch (error) { TelegramBridge.haptic('error'); toast(error?.message || 'Ошибка'); }
    return;
  }

  if (e.target.id === 'adminContactForm') {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries());
    try {
      await Backend.saveContact(data);
      TelegramBridge.haptic('success');
      await refreshPublicData();
      render('admin', {push:false});
      toast('Контакт добавлен');
    } catch (error) { TelegramBridge.haptic('error'); toast(error?.message || 'Ошибка'); }
    return;
  }

  if (e.target.id === 'adminHistoryForm') {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries());
    try {
      await Backend.saveHistory(data);
      TelegramBridge.haptic('success');
      await refreshPublicData();
      render('admin', {push:false});
      toast('Запись добавлена');
    } catch (error) { TelegramBridge.haptic('error'); toast(error?.message || 'Ошибка'); }
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
    mapUrl: (data.mapUrl || '').trim(),
    menuUrl: (data.menuUrl || '').trim()
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

async function bootApp() {
  const safety = window.setTimeout(() => {
    if (!document.body.classList.contains('app-ready')) {
      render('home', {push:false});
      TelegramBridge.applyProfileChip();
      document.body.classList.remove('app-booting');
      document.body.classList.add('app-ready');
    }
  }, 1600);

  await Promise.allSettled([
    refreshPublicData({renderAfter:false}),
    refreshMemberState({renderAfter:false})
  ]);

  window.clearTimeout(safety);
  render('home', {push:false});
  TelegramBridge.applyProfileChip();

  requestAnimationFrame(() => {
    document.body.classList.remove('app-booting');
    document.body.classList.add('app-ready');
  });
}

bootApp();


const formControlSelector = 'input, textarea, select, [contenteditable="true"]';
document.addEventListener('focusin', event => {
  if (!event.target.matches?.(formControlSelector)) return;
  document.body.classList.add('form-focus');
  window.setTimeout(() => {
    event.target.scrollIntoView?.({block:'center', inline:'nearest', behavior:'smooth'});
  }, 220);
});

document.addEventListener('focusout', event => {
  if (!event.target.matches?.(formControlSelector)) return;
  window.setTimeout(() => {
    if (!document.activeElement?.matches?.(formControlSelector)) {
      document.body.classList.remove('form-focus');
    }
  }, 120);
});

document.addEventListener('gesturestart', event => event.preventDefault(), {passive:false});
document.addEventListener('gesturechange', event => event.preventDefault(), {passive:false});
