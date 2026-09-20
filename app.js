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
  check: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.2 4.2L19 7"/></svg>',
  socials: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="6" cy="12" r="2.2"/><circle cx="18" cy="6" r="2.2"/><circle cx="18" cy="18" r="2.2"/><path d="m8 11 7.8-4M8 13l7.8 4"/></svg>'
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
const TOURNAMENT_THEMES = {
  serieA: {
    from: '#061A4D',
    mid: '#0A3D91',
    to: '#0F52BA',
    accent: '#9CC3FF',
    watermark: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Serie%20A.svg'
  },
  europa: {
    from: '#17100C',
    mid: '#7C2A08',
    to: '#E05A12',
    accent: '#FFC08D',
    watermark: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/UEFA_Europa_League_logo_(2024_version).svg'
  },
  champions: {
    from: '#071337',
    mid: '#162B76',
    to: '#2448B8',
    accent: '#A8BCFF',
    watermark: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/UEFA_Champions_League_logo_no_text.svg'
  },
  coppa: {
    from: '#061D18',
    mid: '#086B54',
    to: '#12A37D',
    accent: '#A6F0D7',
    watermark: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Logo_of_Coppa_Italia_Frecciarossa_(2024-2025).svg'
  },
  default: {
    from: '#2B0508',
    mid: '#9E1017',
    to: '#D71920',
    accent: '#FFB2B7',
    watermark: ''
  }
};

function tournamentTheme(name='') {
  const raw = String(name || '').toLowerCase();
  if (raw.includes('serie a') || raw.includes('серия а')) return TOURNAMENT_THEMES.serieA;
  if (raw.includes('europa league') || raw.includes('лига европы')) return TOURNAMENT_THEMES.europa;
  if (raw.includes('champions league') || raw.includes('лига чемпионов')) return TOURNAMENT_THEMES.champions;
  if (raw.includes('coppa italia') || raw.includes('кубок италии')) return TOURNAMENT_THEMES.coppa;
  return TOURNAMENT_THEMES.default;
}

function tournamentThemeStyle(theme) {
  return `--tour-from:${theme.from};--tour-mid:${theme.mid};--tour-to:${theme.to};--tour-accent:${theme.accent};`;
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
let adminUserSearchState = {partyId:null, query:'', loading:false, loaded:false, items:[], error:''};
let adminUserSearchTimer = null;
let rankingState = {loading:false, loaded:false, items:[], error:''};
let selectedRankingProfile = null;
let rankingHelpOpen = false;
let fanYearPickerOpen = false;
let cancellingWatchPartyId = null;
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
function registrationClosesAt(match) {
  const kickoff = Date.parse(match?.iso || '');
  if (!Number.isFinite(kickoff)) return null;
  return new Date(kickoff - 2 * 60 * 60 * 1000);
}
function registrationClosed(match) {
  const closesAt = registrationClosesAt(match);
  return closesAt ? Date.now() >= closesAt.getTime() : false;
}
function registrationDeadlineText(match) {
  const closesAt = registrationClosesAt(match);
  if (!closesAt) return 'Запись закрывается за 2 часа до начала матча';
  if (Date.now() >= closesAt.getTime()) return 'Запись для участников закрыта';
  const dt = moscowParts(closesAt.toISOString());
  return `Запись до ${dt.time} · за 2 часа до матча`;
}
function watchCancelled(match) {
  return match?.collectionStatus === 'cancelled';
}
function watchHome(match) {
  return match?.collectionStatus === 'home';
}
function watchStateText(match) {
  if (!match?.watched) return 'Сбор пока не подтверждён';
  if (watchHome(match)) return 'Сбора не будет, смотрим дома';
  if (watchCancelled(match)) return 'Сбор отменён';
  return 'Сбор подтверждён';
}
function userSearchDisplayName(user) {
  const name = [user?.first_name, user?.last_name].filter(Boolean).join(' ').trim();
  const username = user?.username ? `@${String(user.username).replace(/^@/,'')}` : '';
  return {name:name || username || 'Milanista', username};
}
function renderAdminUserSearchResults(partyId) {
  const state = adminUserSearchState.partyId === partyId
    ? adminUserSearchState
    : {loading:false, loaded:false, items:[], error:''};

  if (state.loading) return '<div class="admin-user-search-status">Ищем участников…</div>';
  if (state.error) return `<div class="admin-user-search-status error">${esc(state.error)}</div>`;
  if (!state.loaded) return '<div class="admin-user-search-status">Начните вводить имя или @username</div>';
  if (!state.items.length) return '<div class="admin-user-search-status">Ничего не найдено</div>';

  return state.items.map(user => {
    const label = userSearchDisplayName(user);
    const inList = user.rsvp_status === 'going';
    const member = user.member_number ? `#${String(user.member_number).padStart(4,'0')}` : '';
    return `<div class="admin-user-result">
      <div class="admin-user-avatar">${esc((label.name || 'M').replace(/^@/,'').charAt(0).toUpperCase())}</div>
      <div class="admin-user-copy">
        <strong>${esc(label.name)}</strong>
        ${label.username && label.username !== label.name ? `<span>${esc(label.username)}${member ? ` · ${esc(member)}` : ''}</span>` : (member ? `<span>${esc(member)}</span>` : '')}
      </div>
      <button class="admin-user-add ${inList ? 'is-added' : ''}" data-action="admin-add-participant" data-party-id="${esc(partyId)}" data-user-id="${esc(user.telegram_user_id)}" ${inList ? 'disabled' : ''}>${inList ? 'В списке' : 'Добавить'}</button>
    </div>`;
  }).join('');
}
function updateAdminUserSearchResults(partyId) {
  const target = document.querySelector('#adminParticipantSearchResults');
  if (target && target.dataset.partyId === partyId) {
    target.innerHTML = renderAdminUserSearchResults(partyId);
  }
}
async function loadAdminUserSearch(partyId, query='', {force=false}={}) {
  if (!isAdmin() || !partyId || !Backend?.searchUsers || !TelegramBridge.isInsideTelegram()) return;

  const normalizedQuery = String(query || '').trim();
  if (!force &&
      adminUserSearchState.partyId === partyId &&
      adminUserSearchState.query === normalizedQuery &&
      (adminUserSearchState.loading || adminUserSearchState.loaded)) return;

  adminUserSearchState = {
    partyId,
    query:normalizedQuery,
    loading:true,
    loaded:false,
    items:adminUserSearchState.partyId === partyId ? adminUserSearchState.items : [],
    error:''
  };
  updateAdminUserSearchResults(partyId);

  try {
    const result = await Backend.searchUsers(partyId, normalizedQuery);
    if (adminUserSearchState.partyId !== partyId || adminUserSearchState.query !== normalizedQuery) return;
    adminUserSearchState = {
      partyId,
      query:normalizedQuery,
      loading:false,
      loaded:true,
      items:Array.isArray(result.users) ? result.users : [],
      error:''
    };
  } catch (error) {
    if (adminUserSearchState.partyId !== partyId || adminUserSearchState.query !== normalizedQuery) return;
    adminUserSearchState = {
      partyId,
      query:normalizedQuery,
      loading:false,
      loaded:true,
      items:[],
      error:error?.message || 'Не удалось загрузить пользователей'
    };
  }
  updateAdminUserSearchResults(partyId);
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
async function loadAttendanceRanking({force=false}={}) {
  if (!Backend?.attendanceRanking || !TelegramBridge.isInsideTelegram()) return;
  if (!force && (rankingState.loading || rankingState.loaded)) return;

  rankingState = {...rankingState, loading:true, error:''};
  if (currentRoute === 'ranking') render('ranking', {push:false});

  try {
    const result = await Backend.attendanceRanking();
    rankingState = {
      loading:false,
      loaded:true,
      items:Array.isArray(result.ranking) ? result.ranking : [],
      periodStart:result.period_start || '2021-09-01',
      error:''
    };
  } catch (error) {
    rankingState = {
      loading:false,
      loaded:true,
      items:[],
      periodStart:'2021-09-01',
      error:error?.message || 'Не удалось загрузить рейтинг'
    };
  }

  if (currentRoute === 'ranking') render('ranking', {push:false});
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
        doorsAt:party?.doors_at || null,
        collectionStatus:party?.collection_status || (party ? 'active' : null),
        cancelReason:party?.cancel_reason || '',
        cancelledAt:party?.cancelled_at || null
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
  const nextJoined = joined(next.partyId);
  const nextRegistrationClosed = next.watched && registrationClosed(next);
  const nextTheme = tournamentTheme(next.competition);
  const nextCancelled = watchCancelled(next);
  const nextHome = watchHome(next);

  return `
  <section class="page home-page">
    <div class="eyebrow">${esc(clubName())}</div>
    <h1 class="page-title home-manifesto"><span>Sempre con te sarò</span><span>Sempre rossonero</span></h1>
    <p class="page-subtitle">Совместные просмотры и жизнь AC Milan Club San Pietroburgo в одном месте!</p>

    <article class="hero home-hero-brand">
      ${nextTheme.watermark ? `<img class="home-tournament-watermark" src="${esc(nextTheme.watermark)}" alt="" aria-hidden="true" onerror="this.hidden=true">` : ''}
      <img class="hero-club-watermark" src="assets/milan-club-logo-dark.webp" alt="" aria-hidden="true">
      <div class="hero-top"><span class="competition">${competitionShort(next.competition)}</span><span class="live-badge">Ближайший матч</span></div>
      <div class="versus">
        <div class="team">${crest(next.home,'hero')}<strong>${esc(displayTeam(next.home))}</strong></div>
        <div class="match-time"><strong>${esc(timeMain)}</strong><span>${next.date} ${next.month}${next.time.includes('МСК') ? ' · МСК' : ''}</span></div>
        <div class="team">${crest(next.away,'hero')}<strong>${esc(displayTeam(next.away))}</strong></div>
      </div>

      <div class="home-watch-state ${nextHome ? 'is-home' : (nextCancelled ? 'is-cancelled' : (next.watched ? 'is-active' : 'is-pending'))}">
        <strong>${esc(watchStateText(next))}</strong>
        ${nextCancelled && next.cancelReason ? `<span>${esc(next.cancelReason)}</span>` : ''}
      </div>

      <div class="hero-meta">${nextHome ? 'Этот матч смотрим дома' : (next.watched ? `${esc(getVenue(next.venueId).name)} · ${esc(getVenue(next.venueId).meeting)}` : 'Совместный просмотр ещё не опубликован')}</div>
      <div class="hero-actions">
        ${next.watched
          ? (nextHome
            ? '<button class="primary-btn premium-btn gathering-home-btn" type="button" disabled><span>СМОТРИМ ДОМА</span></button>'
            : (nextCancelled
              ? '<button class="primary-btn premium-btn gathering-cancelled-btn" type="button" disabled><span>СБОР ОТМЕНЁН</span></button>'
              : (nextRegistrationClosed && !nextJoined
                ? '<button class="primary-btn premium-btn registration-closed" type="button" disabled><span>ЗАПИСЬ ЗАКРЫТА</span></button>'
                : `<button class="primary-btn premium-btn ${nextJoined ? 'joined' : ''}" data-action="rsvp" data-party-id="${esc(next.partyId)}">${nextJoined ? `${icon('check')}<span>Я ИДУ</span>` : '<span>ИДУ НА ПРОСМОТР</span>'}</button>`)))
          : '<button class="primary-btn premium-btn joined" type="button" disabled><span>СБОР НЕ ПОДТВЕРЖДЁН</span></button>'}
        <button class="secondary-btn hero-details-btn" data-route="watch"><span>Подробнее</span></button>
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
    <div class="fixture-list">${filtered.map(f=>{
      const theme = tournamentTheme(f.competition);
      const cancelled = watchCancelled(f);
      const home = watchHome(f);
      return `
      <article class="fixture match-tournament-card" style="${tournamentThemeStyle(theme)}">
        <div class="fixture-date"><strong>${f.date}</strong><span>${f.month}</span></div>
        <div class="fixture-main">
          <div class="fixture-clubs">
            ${crest(f.home,'xs')}<strong>${esc(displayTeam(f.home))}</strong><span class="fixture-vs">—</span>${crest(f.away,'xs')}<strong>${esc(displayTeam(f.away))}</strong>
          </div>
          <span>${esc(f.competition)}</span>
        </div>
        <div class="fixture-side"><strong>${esc(f.time)}</strong>${home ? '<span class="fixture-home">● СМОТРИМ ДОМА</span>' : (cancelled ? '<span class="fixture-cancelled">● СБОР ОТМЕНЁН</span>' : (f.watched?'<span>● ПРОСМОТР</span>':''))}</div>
      </article>`;
    }).join('')}</div>
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
  const firstJoined = joined(first.partyId);
  const firstRegistrationClosed = registrationClosed(first);
  const firstTheme = tournamentTheme(first.competition);
  const firstCancelled = watchCancelled(first);
  const firstHome = watchHome(first);
  const searchState = adminUserSearchState.partyId === first.partyId
    ? adminUserSearchState
    : {partyId:first.partyId, query:'', loading:false, loaded:false, items:[], error:''};

  return `<section class="page">
    <div class="eyebrow">${esc(clubName())}</div>
    <h1 class="page-title">Просмотры</h1>
    <p class="page-subtitle">Все совместные матчи фан-клуба: где встречаемся, когда приходить и кто уже идёт.</p>

    <article class="watch-feature watch-brand-surface">
      ${firstTheme.watermark ? `<img class="watch-tournament-watermark-left" src="${esc(firstTheme.watermark)}" alt="" aria-hidden="true" onerror="this.hidden=true">` : ''}
      <img class="watch-club-watermark" src="assets/milan-club-logo-dark.webp" alt="" aria-hidden="true">
      <div class="watch-feature-content">
        <span class="eyebrow">${first.date} ${first.month} · ${esc(first.competition)}</span>
        ${firstHome ? `
          <div class="gathering-home-banner">
            <strong>Сбора не будет</strong>
            <span>Смотрим дома</span>
          </div>
        ` : (firstCancelled ? `
          <div class="gathering-cancelled-banner">
            <strong>Сбор отменён</strong>
            <span>${esc(first.cancelReason || 'Просмотр не состоится')}</span>
          </div>
        ` : '')}
        <div class="watch-match-row">
          <div class="watch-team">${crest(first.home,'hero')}<strong>${esc(displayTeam(first.home))}</strong></div>
          <div class="watch-vs">vs</div>
          <div class="watch-team">${crest(first.away,'hero')}<strong>${esc(displayTeam(first.away))}</strong></div>
        </div>
        ${firstHome ? `
          <div class="watch-home-location">
            <strong>Смотрим дома</strong>
            <small>Совместного сбора на этот матч не будет</small>
          </div>
          <p class="watch-meeting-copy">Начало матча: ${esc(first.time)}</p>
        ` : (bar.mapUrl ? `
          <button class="watch-venue-link" data-action="open-map" data-url="${esc(bar.mapUrl)}" type="button">
            <span class="watch-venue-copy">
              <strong>${esc(bar.name)} · Санкт-Петербург</strong>
              <small>${esc(bar.address)}</small>
            </span>
            ${icon('arrowUpRight')}
          </button>
        ` : `
          <div class="watch-venue-static">
            <strong>${esc(bar.name)} · Санкт-Петербург</strong>
            <small>${esc(bar.address)}</small>
          </div>
        `)}
        ${!firstHome ? `<p class="watch-meeting-copy">${esc(bar.meeting)} · Начало: ${esc(first.time)}</p>` : ''}
      </div>
      <div class="watch-feature-content">
        ${firstHome ? `
          <div class="watch-home-state-card">
            <strong>Сбора не будет</strong>
            <span>Смотрим дома</span>
          </div>
          <button style="margin-top:10px" class="primary-btn premium-btn gathering-home-btn" type="button" disabled><span>СМОТРИМ ДОМА</span></button>
        ` : `
          <div class="watch-stats">
            <div class="watch-stat"><strong>${first.attendeeCount || 0}</strong><span>уже идут</span></div>
            <div class="watch-stat"><strong>${first.capacity || '∞'}</strong><span>мест</span></div>
            <div class="watch-stat"><strong>SPB</strong><span>наш город</span></div>
          </div>
          ${firstCancelled
            ? '<button style="margin-top:10px" class="primary-btn premium-btn gathering-cancelled-btn" type="button" disabled><span>СБОР ОТМЕНЁН</span></button>'
            : (firstRegistrationClosed && !firstJoined
              ? '<button style="margin-top:10px" class="primary-btn premium-btn registration-closed" type="button" disabled><span>ЗАПИСЬ ЗАКРЫТА</span></button>'
              : `<button style="margin-top:10px" class="primary-btn premium-btn ${firstJoined?'joined':''}" data-action="rsvp" data-party-id="${esc(first.partyId)}">${firstJoined?`${icon('check')}<span>ВЫ В СПИСКЕ</span>`:'<span>ПРИСОЕДИНИТЬСЯ</span>'}</button>`)}
          ${firstCancelled
            ? `<div class="registration-deadline is-closed">${esc(first.cancelReason || 'Просмотр не состоится')}</div>`
            : `<div class="registration-deadline ${firstRegistrationClosed ? 'is-closed' : ''}">${esc(registrationDeadlineText(first))}</div>`}
        `}
      </div>
    </article>

    ${isAdmin() ? `
      <section class="admin-participant-panel">
        <div class="admin-participant-head">
          <div>
            <span class="eyebrow">Администратор</span>
            <h3>${firstHome ? 'Статус просмотра' : 'Добавить участника'}</h3>
          </div>
          <span>доступно всегда</span>
        </div>
        ${!firstHome ? `
          <label class="admin-user-search">
            <span class="admin-user-search-icon">⌕</span>
            <input id="adminParticipantSearch" data-party-id="${esc(first.partyId)}" type="search" value="${esc(searchState.query || '')}" placeholder="Имя или @username" autocomplete="off">
          </label>
          <div class="admin-user-search-results" id="adminParticipantSearchResults" data-party-id="${esc(first.partyId)}">${renderAdminUserSearchResults(first.partyId)}</div>
        ` : ''}

        <div class="admin-watch-status">
          ${firstHome ? `
            <div class="admin-watch-home-copy">
              <strong>Сбора не будет</strong>
              <span>Смотрим дома</span>
            </div>
            <button class="secondary-wide admin-restore-watch" data-action="admin-restore-watch" data-party-id="${esc(first.partyId)}" type="button">Провести сбор</button>
          ` : (firstCancelled ? `
            <div class="admin-watch-cancelled-copy">
              <strong>Сбор отменён</strong>
              <span>${esc(first.cancelReason || 'Причина не указана')}</span>
            </div>
            <div class="admin-status-actions">
              <button class="secondary-wide admin-restore-watch" data-action="admin-restore-watch" data-party-id="${esc(first.partyId)}" type="button">Возобновить сбор</button>
              <button class="secondary-wide admin-home-watch" data-action="admin-home-watch" data-party-id="${esc(first.partyId)}" type="button">Смотрим дома</button>
            </div>
          ` : `
            <div class="admin-status-actions">
              <button class="secondary-wide admin-home-watch" data-action="admin-home-watch" data-party-id="${esc(first.partyId)}" type="button">Сбора не будет — смотрим дома</button>
              <button class="secondary-wide admin-cancel-watch" data-action="open-cancel-watch" data-party-id="${esc(first.partyId)}" type="button">Отменить сбор</button>
            </div>
            ${cancellingWatchPartyId === first.partyId ? `
              <form class="cancel-watch-form" id="adminCancelWatchForm">
                <input type="hidden" name="watch_party_id" value="${esc(first.partyId)}">
                <label>
                  <span>Причина отмены</span>
                  <textarea name="cancel_reason" rows="3" required placeholder="Например: не собрали кворум для проведения"></textarea>
                </label>
                <div class="cancel-watch-actions">
                  <button type="submit" class="primary-btn danger-btn">ПОДТВЕРДИТЬ ОТМЕНУ</button>
                  <button type="button" class="secondary-wide" data-action="close-cancel-watch">Не отменять</button>
                </div>
              </form>
            ` : ''}
          `)}
        </div>
      </section>
    ` : ''}

    ${firstHome ? '<div class="watch-home-note">Для этого матча совместного сбора нет — список участников не ведётся.</div>' : `    <div class="section-head participants-head">
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

`}

    <div class="section-head"><h2>Другие просмотры</h2></div>
    <div class="fixture-list">${otherParties.map(f=>`
      <article class="fixture fixture-clickable" data-action="open-watch-party" data-party-id="${esc(f.partyId)}">
        <div class="fixture-date"><strong>${f.date}</strong><span>${f.month}</span></div>
        <div class="fixture-main">
          <div class="fixture-clubs">${crest(f.home,'xs')}<strong>${esc(displayTeam(f.home))}</strong><span class="fixture-vs">—</span>${crest(f.away,'xs')}<strong>${esc(displayTeam(f.away))}</strong></div>
          <span>${esc(f.competition)} · ${watchHome(f) ? 'Смотрим дома' : esc(getVenue(f.venueId).name)}</span>
        </div>
        <div class="fixture-side"><strong>${esc(f.time)}</strong><span class="${watchHome(f) ? 'fixture-home' : (watchCancelled(f) ? 'fixture-cancelled' : '')}">${watchHome(f) ? '● СМОТРИМ ДОМА' : (watchCancelled(f) ? '● СБОР ОТМЕНЁН' : '● FAN CLUB')}</span></div>
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

function renderRanking() {
  const tgUser = TelegramBridge.user();
  const myId = Number(tgUser?.id || 0);
  const items = rankingState.items || [];

  return `<section class="page ranking-page">
    <div class="eyebrow">AC Milan Club San Pietroburgo</div>
    <h1 class="page-title">Рейтинг участников</h1>
    <p class="page-subtitle">Учёт посещений ведётся с сентября 2021 года.</p>
    <div class="ranking-disclaimer">Данные в рейтинге приблизительные. Сезон 2022/23 рассчитан по среднему количеству посещений.</div>

    <button class="ranking-help-toggle" data-action="toggle-ranking-help" aria-expanded="${rankingHelpOpen ? 'true' : 'false'}">
      <span class="ranking-help-icon">i</span>
      <span>Как считается рейтинг?</span>
      <span class="ranking-help-chevron">${rankingHelpOpen ? '−' : '+'}</span>
    </button>

    ${rankingHelpOpen ? `
      <div class="ranking-help-card">
        <p><strong>1 просмотр = 1 подтверждённое посещение</strong> совместного просмотра фан-клуба.</p>
        <div class="ranking-rank-scale">
          <span><strong>Nuovo</strong><small>0–10</small></span>
          <span><strong>Milanista</strong><small>11–30</small></span>
          <span><strong>Rossonero</strong><small>31–60</small></span>
          <span><strong>Senatore</strong><small>61–99</small></span>
          <span><strong>Leggenda</strong><small>100+</small></span>
        </div>
      </div>
    ` : ''}

    <div class="ranking-summary">
      <div><strong>${items.length}</strong><span>участников в рейтинге</span></div>
      <div><strong>${items.reduce((sum, item) => sum + Number(item.total_visits || 0), 0)}</strong><span>посещений учтено</span></div>
    </div>

    ${rankingState.loading ? `
      <div class="ranking-loading">
        <span></span><span></span><span></span>
      </div>
    ` : ''}

    ${rankingState.error ? `<div class="notice">${esc(rankingState.error)}</div>` : ''}

    ${!rankingState.loading && !rankingState.error && !items.length ? `
      <div class="notice">Исторические данные пока не загружены. После импорта списка посещений рейтинг появится здесь.</div>
    ` : ''}

    <div class="ranking-list">
      ${items.map((item, index) => {
        const rank = memberRank(Number(item.total_visits || 0));
        const isMe = myId && Number(item.telegram_user_id) === myId;
        const username = item.username ? `@${String(item.username).replace(/^@/,'')}` : '';
        const initialSource = item.display_name || username || 'M';
        const initial = String(initialSource).replace(/^@/,'').trim().charAt(0).toUpperCase() || 'M';
        return `
          <article class="ranking-row ${isMe ? 'is-me' : ''} ${index < 3 ? `ranking-top ranking-top-${index + 1}` : ''}" data-action="open-fan-profile" data-ranking-index="${index}">
            <div class="ranking-position">${item.position || index + 1}</div>
            <div class="ranking-avatar"><span>${esc(initial)}</span>${item.photo_url ? `<img src="${esc(item.photo_url)}" alt="" loading="lazy">` : ''}</div>
            <div class="ranking-person">
              <strong>${esc(item.display_name || username || 'Milanista')}</strong>
              ${username && item.display_name !== username ? `<span>${esc(username)}</span>` : ''}
              <small>${esc(rank.name)}</small>
            </div>
            <div class="ranking-visits">
              <strong>${Number(item.total_visits || 0)}</strong>
              <span>просмотров</span>
            </div>
          </article>`;
      }).join('')}
    </div>

    <div class="ranking-footnote">Новые посещения добавляются после подтверждения администратором.</div>
  </section>`;
}

function renderFanProfile() {
  const item = selectedRankingProfile;
  if (!item) return `<section class="page"><div class="notice">Профиль участника не найден.</div></section>`;

  const visits = Number(item.total_visits || 0);
  const rank = memberRank(visits);
  const username = item.username ? `@${String(item.username).replace(/^@/,'')}` : '';
  const name = item.display_name || username || 'Milanista';
  const initial = String(name).replace(/^@/,'').trim().charAt(0).toUpperCase() || 'M';
  const memberNumber = item.member_number ? String(item.member_number).padStart(4,'0') : '—';
  const fanSince = item.fan_since_year || '—';
  const photo = item.photo_url
    ? `<div class="fan-profile-photo-shell"><div class="fan-profile-photo-fallback">${esc(initial)}</div><img class="fan-profile-photo" src="${esc(item.photo_url)}" alt="${esc(name)}"></div>`
    : `<div class="fan-profile-photo-shell"><div class="fan-profile-photo-fallback">${esc(initial)}</div></div>`;

  return `<section class="page fan-profile-page">
    <div class="eyebrow">Rossoneri ID</div>
    <h1 class="page-title">Профиль участника</h1>
    <article class="fan-profile-card">
      <div class="fan-profile-hero">
        ${photo}
        <div class="fan-profile-identity">
          <div class="member-number">AC Milan Club San Pietroburgo · #${memberNumber}</div>
          <div class="fan-profile-name">${esc(name)}</div>
          ${username && username !== name ? `<div class="member-handle">${esc(username)}</div>` : ''}
        </div>
      </div>

      <div class="fan-profile-stats">
        <div><strong>${visits}</strong><span>просмотров</span></div>
        <div><strong>${Number(item.position || 0) || '—'}</strong><span>место в рейтинге</span></div>
        <div><strong>${esc(fanSince)}</strong><span>болею с</span></div>
      </div>

      <div class="member-rank-card fan-profile-rank">
        <div><span>Ранг</span><strong>${esc(rank.name)}</strong></div>
        <small>${esc(rank.note)}</small>
      </div>

      ${item.telegram_user_id ?
        '<div class="fan-profile-status is-linked">Telegram-профиль подключён</div>' :
        '<div class="fan-profile-status">Фото и дополнительные данные появятся после первого входа участника в Mini App.</div>'}
    </article>
  </section>`;
}
function renderMore() {
  return `<section class="page">
    <div class="eyebrow">${esc(clubName())}</div>
    <h1 class="page-title">Меню</h1>
    <p class="page-subtitle">Всё, что нужно вне матчей и просмотров.</p>
    <div class="more-grid">
      <button class="more-tile premium-tile" data-route="bar"><span class="tile-icon">${icon('pin')}</span><div><strong>Наш бар</strong><span>Адрес, меню и matchday предложения</span></div>${icon('arrowUpRight','tile-arrow')}</button>
      <button class="more-tile premium-tile" data-route="contacts"><span class="tile-icon">${icon('message')}</span><div><strong>Контакты</strong><span>Кому написать по просмотрам и членству</span></div>${icon('arrowUpRight','tile-arrow')}</button>
      <button class="more-tile premium-tile" data-route="socials"><span class="tile-icon">${icon('socials')}</span><div><strong>Соцсети</strong><span>Telegram, VK и Instagram</span></div>${icon('arrowUpRight','tile-arrow')}</button>
      <button class="more-tile premium-tile" data-route="club"><span class="tile-icon">${icon('history')}</span><div><strong>История</strong><span>Люди и события ${esc(clubName())}</span></div>${icon('arrowUpRight','tile-arrow')}</button>
      <button class="more-tile premium-tile" data-route="profile"><span class="tile-icon">${icon('user')}</span><div><strong>Мой профиль</strong><span>Карточка участника и посещения</span></div>${icon('arrowUpRight','tile-arrow')}</button>
      ${isAdmin() ? `<button class="more-tile premium-tile admin-tile" data-route="admin"><span class="tile-icon">${icon('settings')}</span><div><strong>Админка</strong><span>Просмотры, меню, контакты и история</span></div>${icon('arrowUpRight','tile-arrow')}</button>` : ''}
    </div>
  </section>`;
}

function renderSocials() {
  const socials = [
    {
      type:'telegram',
      title:'Telegram-канал',
      handle:'@milanspb_news',
      note:'Новости и анонсы фан-клуба',
      url:'https://t.me/milanspb_news',
      icon:`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.7 4.1 3.8 10.6c-1.2.5-1.2 1.2-.2 1.5l4.3 1.3 1.7 5.1c.2.7.1 1 .8 1 .5 0 .7-.2 1-.5l2.1-2 4.4 3.2c.8.5 1.4.3 1.6-.8l2.9-13.8c.3-1.3-.5-1.9-1.7-1.5Z"/><path d="m8.1 13.2 9.8-6.1c.5-.3.9-.1.5.2l-8.1 7.3-.3 3.6"/></svg>`
    },
    {
      type:'telegram',
      title:'Telegram-чат',
      handle:'Чат фан-клуба',
      note:'Общение, матчи и встречи',
      url:'https://t.me/+F1uR8Zl9ics0OWYy',
      icon:`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.7 4.1 3.8 10.6c-1.2.5-1.2 1.2-.2 1.5l4.3 1.3 1.7 5.1c.2.7.1 1 .8 1 .5 0 .7-.2 1-.5l2.1-2 4.4 3.2c.8.5 1.4.3 1.6-.8l2.9-13.8c.3-1.3-.5-1.9-1.7-1.5Z"/><path d="m8.1 13.2 9.8-6.1c.5-.3.9-.1.5.2l-8.1 7.3-.3 3.6"/></svg>`
    },
    {
      type:'vk',
      title:'ВКонтакте',
      handle:'spbacmilan',
      note:'Сообщество Milan Club SPB',
      url:'https://vk.ru/spbacmilan',
      icon:`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3.5 5.5h3.8c.2 3.5 1.7 6.6 3 7.3V5.5h3.6v4.2c1.3-.1 2.7-2.3 3.2-4.2h3.6c-.4 2.2-2.1 4.6-3.5 5.6 1.4.8 3.6 3.2 4.3 5.9h-4c-.6-1.8-2.1-4-3.6-4.2V17h-.4C7.9 17 4.8 13.2 3.5 5.5Z"/></svg>`
    },
    {
      type:'instagram',
      title:'Instagram',
      handle:'@acmilansaintp',
      note:'Фото и жизнь фан-клуба',
      url:'https://www.instagram.com/acmilansaintp/',
      icon:`<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.4" cy="6.8" r="1"/></svg>`
    }
  ];

  return `<section class="page social-page">
    <div class="eyebrow">${esc(clubName())}</div>
    <h1 class="page-title">Соцсети</h1>
    <p class="page-subtitle">Все официальные площадки AC Milan Club San Pietroburgo.</p>

    <div class="social-list">
      ${socials.map(item => `
        <button class="social-card social-card-${item.type}" data-action="social-link" data-url="${esc(item.url)}" type="button">
          <span class="social-brand-icon">${item.icon}</span>
          <span class="social-copy">
            <strong>${esc(item.title)}</strong>
            <span>${esc(item.handle)}</span>
            <small>${esc(item.note)}</small>
          </span>
          ${icon('arrowUpRight','social-arrow')}
        </button>
      `).join('')}
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

function fanSinceYearButtons(selectedYear = '') {
  const minYear = 1980;
  const maxYear = 2026;
  const activeYear = Number(selectedYear) || maxYear;
  const buttons = [];

  for (let year = maxYear; year >= minYear; year -= 1) {
    buttons.push(`
      <button
        class="fan-year-option ${Number(selectedYear) === year ? 'is-selected' : ''}"
        data-action="set-fan-year"
        data-year="${year}"
        ${year === activeYear ? 'data-year-anchor="true"' : ''}
        type="button"
      >
        <span>${year}</span>
        ${Number(selectedYear) === year ? '<small>выбрано</small>' : ''}
      </button>
    `);
  }

  return buttons.join('');
}

function focusFanYearPicker() {
  window.setTimeout(() => {
    const grid = document.querySelector('.fan-year-grid');
    const target = grid?.querySelector('.fan-year-option.is-selected, .fan-year-option[data-year-anchor="true"]');
    if (!grid || !target) return;
    target.scrollIntoView({block:'center', inline:'nearest', behavior:'instant'});
  }, 70);
}

function renderProfile() {
  const tgUser = TelegramBridge.user();
  const name = esc(TelegramBridge.fullName());
  const username = tgUser?.username ? `@${esc(tgUser.username)}` : (TelegramBridge.isInsideTelegram() ? 'Telegram подключён' : 'Откройте приложение из Telegram');
  const memberNumber = memberState?.profile?.member_number ? String(memberState.profile.member_number).padStart(4,'0') : '—';
  const visits = Number(memberState?.attendance_total ?? memberState?.rsvps?.filter(r => r.attendance_status === 'attended').length ?? 0);
  const rank = memberRank(visits);
  const fanSinceYear = memberState?.profile?.fan_since_year || '';
  const photo = tgUser?.photo_url ? `<img class="profile-hero-photo" src="${esc(tgUser.photo_url)}" alt="">` : `<div class="profile-hero-fallback">${name.charAt(0).toUpperCase()}</div>`;

  return `<section class="page">
    <div class="eyebrow">Rossoneri ID</div>
    <h1 class="page-title">Профиль</h1>

    <article class="profile-card">
      <div class="profile-identity">${photo}<div><div class="member-number">AC Milan Club San Pietroburgo · #${memberNumber}</div><div class="member-name">${name}</div><div class="member-handle">${username}</div></div></div>

      <div class="stats-grid profile-stats-grid">
        <div class="stat-card"><strong>${visits}</strong><span>просмотров</span></div>

        <button class="stat-card fan-since-stat fan-since-premium" data-action="open-fan-year-picker" type="button">
          <span class="fan-since-label">болею за Milan с</span>
          <span class="fan-since-premium-row">
            <strong>${fanSinceYear || '—'}</strong>
            <span class="fan-since-edit">${fanSinceYear ? 'Изменить' : 'Указать'}</span>
          </span>
          <small>${fanSinceYear ? 'Rossonero since' : 'Добавь свой год'}</small>
        </button>
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

    ${fanYearPickerOpen ? `
      <div class="fan-year-backdrop" data-action="close-fan-year-picker">
        <section class="fan-year-sheet" data-action="fan-year-sheet" role="dialog" aria-modal="true" aria-label="Выберите год">
          <div class="fan-year-handle"></div>

          <div class="fan-year-sheet-head">
            <div>
              <span class="eyebrow">Rossoneri since</span>
              <h2>С какого года ты за Milan?</h2>
            </div>
            <button class="fan-year-close" data-action="close-fan-year-picker" type="button" aria-label="Закрыть">×</button>
          </div>

          <p class="fan-year-sheet-copy">Выбери год — он сразу сохранится в твоём Rossoneri ID.</p>

          <div class="fan-year-grid-wrap">
            <div class="fan-year-grid">
              ${fanSinceYearButtons(fanSinceYear)}
            </div>
          </div>

          <div class="fan-year-sheet-footer">
            <span>1899</span>
            <span>Выбери свой год</span>
            <span>${new Date().getFullYear()}</span>
          </div>
        </section>
      </div>
    ` : ''}
  </section>`;
}

const routes = { home:renderHome, matches:renderMatches, watch:renderWatch, ranking:renderRanking, fanprofile:renderFanProfile, club:renderClub, more:renderMore, socials:renderSocials, bar:renderBar, contacts:renderContacts, admin:renderAdmin, profile:renderProfile };

function render(route=currentRoute, {push=true}={}) {
  const nextRoute = routes[route] ? route : 'home';
  if (nextRoute !== 'profile') fanYearPickerOpen = false;
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
    if (party?.partyId) {
      window.setTimeout(() => loadWatchParticipants(party.partyId), 0);
      if (isAdmin()) {
        const query = adminUserSearchState.partyId === party.partyId ? adminUserSearchState.query : '';
        window.setTimeout(() => loadAdminUserSearch(party.partyId, query), 0);
      }
    }
  }
  if (nextRoute === 'ranking') {
    window.setTimeout(() => loadAttendanceRanking(), 0);
  }
}

function goBack() {
  if (fanYearPickerOpen && currentRoute === 'profile') {
    fanYearPickerOpen = false;
    render('profile', {push:false});
    return;
  }

  if (cancellingWatchPartyId && currentRoute === 'watch') {
    cancellingWatchPartyId = null;
    render('watch', {push:false});
    return;
  }

  if (currentRoute === 'home') {
    TelegramBridge.showBack(false);
    return;
  }

  if (routeStack.length > 1) routeStack.pop();

  let previous = routeStack[routeStack.length - 1] || 'home';
  if (!routes[previous]) previous = 'home';

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

  if(action==='social-link'){
    const url = actionEl?.dataset.url;
    if (!url) return;
    TelegramBridge.haptic('selection');
    TelegramBridge.open(url);
    return;
  }

  if(action==='open-map'){
    const url = actionEl?.dataset.url;
    if (!url) return;
    TelegramBridge.haptic('selection');
    TelegramBridge.open(url);
    return;
  }

  if(action==='open-fan-year-picker'){
    fanYearPickerOpen = true;
    TelegramBridge.haptic('selection');
    render('profile', {push:false});
    focusFanYearPicker();
    return;
  }

  if(action==='close-fan-year-picker'){
    fanYearPickerOpen = false;
    TelegramBridge.haptic('selection');
    render('profile', {push:false});
    return;
  }

  if(action==='fan-year-sheet'){
    return;
  }

  if(action==='set-fan-year'){
    const year = Number(actionEl?.dataset.year);
    const minYear = 1980;
    const maxYear = 2026;

    if (!Number.isInteger(year) || year < minYear || year > maxYear) return;
    if (!Backend?.updateProfile || !TelegramBridge.isInsideTelegram()) {
      toast('Откройте приложение из Telegram');
      return;
    }

    actionEl.disabled = true;
    try {
      const result = await Backend.updateProfile({fan_since_year: year});
      memberState = {...(memberState || {}), profile: result.profile};
      fanYearPickerOpen = false;
      TelegramBridge.haptic('success');
      render('profile', {push:false});
      toast(`Болею за Milan с ${year}`);
    } catch (error) {
      TelegramBridge.haptic('error');
      toast(error?.message || 'Не удалось сохранить год');
      actionEl.disabled = false;
    }
    return;
  }

  if(action==='toggle-ranking-help'){
    rankingHelpOpen = !rankingHelpOpen;
    TelegramBridge.haptic('selection');
    render('ranking', {push:false});
    return;
  }

  if(action==='open-fan-profile'){
    const index = Number(actionEl?.dataset.rankingIndex);
    const item = Number.isInteger(index) ? rankingState.items?.[index] : null;
    if (!item) return;
    selectedRankingProfile = item;
    TelegramBridge.haptic();
    render('fanprofile');
    return;
  }

  if(action==='open-watch-party'){
    const partyId = actionEl?.dataset.partyId;
    if (partyId) {
      selectedWatchPartyId = partyId;
      if (adminUserSearchState.partyId !== partyId) {
        adminUserSearchState = {partyId, query:'', loading:false, loaded:false, items:[], error:''};
      }
      TelegramBridge.haptic();
      render('watch', {push:false});
    }
    return;
  }

  if(action==='open-cancel-watch'){
    if (!isAdmin()) { toast('Нужны права администратора'); return; }
    cancellingWatchPartyId = actionEl?.dataset.partyId || null;
    TelegramBridge.haptic('selection');
    render('watch', {push:false});
    return;
  }

  if(action==='close-cancel-watch'){
    cancellingWatchPartyId = null;
    TelegramBridge.haptic('selection');
    render('watch', {push:false});
    return;
  }

  if(action==='admin-home-watch'){
    if (!isAdmin() || !Backend?.setWatchStatus) { toast('Нужны права администратора'); return; }
    const partyId = actionEl?.dataset.partyId;
    if (!partyId) return;
    actionEl.disabled = true;
    try {
      await Backend.setWatchStatus(partyId, 'home', '');
      cancellingWatchPartyId = null;
      TelegramBridge.haptic('success');
      await refreshPublicData({renderAfter:false});
      render('watch', {push:false});
      toast('Статус: сбора не будет, смотрим дома');
    } catch (error) {
      TelegramBridge.haptic('error');
      toast(error?.message || 'Не удалось изменить статус');
      actionEl.disabled = false;
    }
    return;
  }

  if(action==='admin-restore-watch'){
    if (!isAdmin() || !Backend?.setWatchStatus) { toast('Нужны права администратора'); return; }
    const partyId = actionEl?.dataset.partyId;
    if (!partyId) return;
    actionEl.disabled = true;
    try {
      await Backend.setWatchStatus(partyId, 'active', '');
      cancellingWatchPartyId = null;
      TelegramBridge.haptic('success');
      await refreshPublicData({renderAfter:false});
      render('watch', {push:false});
      toast('Сбор снова подтверждён');
    } catch (error) {
      TelegramBridge.haptic('error');
      toast(error?.message || 'Не удалось возобновить сбор');
      actionEl.disabled = false;
    }
    return;
  }

  if(action==='admin-add-participant'){
    if (!isAdmin() || !Backend?.addParticipant) { toast('Нужны права администратора'); return; }
    const partyId = actionEl?.dataset.partyId;
    const userId = Number(actionEl?.dataset.userId);
    if (!partyId || !Number.isSafeInteger(userId)) return;

    actionEl.disabled = true;
    try {
      await Backend.addParticipant(partyId, userId);
      TelegramBridge.haptic('success');
      participantState.delete(partyId);
      await Promise.all([
        loadWatchParticipants(partyId, {force:true}),
        refreshPublicData({renderAfter:false})
      ]);
      if (adminUserSearchState.partyId === partyId) {
        adminUserSearchState = {
          ...adminUserSearchState,
          items:adminUserSearchState.items.map(user =>
            Number(user.telegram_user_id) === userId ? {...user, rsvp_status:'going'} : user
          )
        };
      }
      render('watch', {push:false});
      toast('Участник добавлен');
    } catch (error) {
      TelegramBridge.haptic('error');
      toast(error?.message || 'Не удалось добавить участника');
      actionEl.disabled = false;
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

document.addEventListener('input', e => {
  if (e.target.id !== 'adminParticipantSearch') return;

  const input = e.target;
  const partyId = input.dataset.partyId;
  const query = input.value || '';

  adminUserSearchState = {
    ...adminUserSearchState,
    partyId,
    query,
    loading:false,
    loaded:false,
    error:''
  };

  window.clearTimeout(adminUserSearchTimer);
  adminUserSearchTimer = window.setTimeout(() => {
    loadAdminUserSearch(partyId, query, {force:true});
  }, 220);
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

  if (e.target.id === 'adminCancelWatchForm') {
    e.preventDefault();
    if (!isAdmin() || !Backend?.setWatchStatus) { toast('Нужны права администратора'); return; }
    const data = Object.fromEntries(new FormData(e.target).entries());
    const partyId = String(data.watch_party_id || '');
    const reason = String(data.cancel_reason || '').trim();
    if (!reason) { toast('Укажите причину отмены'); return; }

    const button = e.target.querySelector('button[type="submit"]');
    if (button) button.disabled = true;
    try {
      await Backend.setWatchStatus(partyId, 'cancelled', reason);
      cancellingWatchPartyId = null;
      TelegramBridge.haptic('success');
      await refreshPublicData({renderAfter:false});
      render('watch', {push:false});
      toast('Сбор отменён');
    } catch (error) {
      TelegramBridge.haptic('error');
      toast(error?.message || 'Не удалось отменить сбор');
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

function showBootFailure(error) {
  try { console.error('Milan Club boot failed', error); } catch (_) {}
  try { window.__milanNativeReady?.(); } catch (_) {}
  document.body.classList.remove('app-booting');
  document.body.classList.add('app-ready');
  const app = document.getElementById('app');
  if (!app || app.innerHTML.trim()) return;
  app.innerHTML = `<section class="page">
    <div class="eyebrow">AC Milan Club San Pietroburgo</div>
    <h1 class="page-title">Не удалось запустить приложение</h1>
    <p class="page-subtitle">Перезапусти Mini App. Если проблема повторится, обнови Telegram и Android System WebView.</p>
    <button class="primary-btn premium-btn" onclick="location.reload()"><span>ПОВТОРИТЬ</span></button>
  </section>`;
}

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

bootApp().catch(showBootFailure);


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
