const fixtures = [
  {date:'20', month:'сен', iso:'2026-09-20', home:'AC Milan', away:'Lecce', competition:'Serie A · 5 тур', time:'21:45 МСК', watched:true, status:'ПРОСМОТР'},
  {date:'10/11', month:'окт', iso:'2026-10-10', home:'Sassuolo', away:'AC Milan', competition:'Serie A · 6 тур', time:'время уточняется', watched:false, status:''},
  {date:'15', month:'окт', iso:'2026-10-15', home:'Salzburg', away:'AC Milan', competition:'Europa League · 2 тур', time:'19:45 МСК', watched:true, status:'ПРОСМОТР'},
  {date:'17/18', month:'окт', iso:'2026-10-17', home:'AC Milan', away:'Atalanta', competition:'Serie A · 7 тур', time:'время уточняется', watched:true, status:'ПРОСМОТР'},
  {date:'22', month:'окт', iso:'2026-10-22', home:'Bournemouth', away:'AC Milan', competition:'Europa League · 3 тур', time:'22:00 МСК', watched:true, status:'ПРОСМОТР'},
  {date:'24/25', month:'окт', iso:'2026-10-24', home:'Udinese', away:'AC Milan', competition:'Serie A · 8 тур', time:'время уточняется', watched:false, status:''},
  {date:'28', month:'окт', iso:'2026-10-28', home:'AC Milan', away:'Bologna', competition:'Serie A · 9 тур', time:'время уточняется', watched:true, status:'ПРОСМОТР'},
  {date:'31/01', month:'окт/ноя', iso:'2026-10-31', home:'AC Milan', away:'Inter', competition:'Serie A · Derby', time:'время уточняется', watched:true, status:'ПРОСМОТР'}
];

const menu = {
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

const contacts = [
  {name:'Даниил', role:'Организация просмотров', initials:'Д'},
  {name:'Команда Milan Club SPB', role:'Членство и мероприятия', initials:'M'}
];

const defaultBar = {
  name: 'Бар пока не выбран',
  address: 'Укажите адрес площадки',
  meeting: 'Сбор гостей за 60 минут до матча',
  mapUrl: ''
};

function getBar() {
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

function esc(s='') { return s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c])); }
function joined() { return localStorage.getItem('milanclub:rsvp:lecce') === '1'; }
function competitionShort(c) { return c.startsWith('Serie') ? 'SERIE A' : 'EUROPA LEAGUE'; }

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
      <div class="hero-meta">${esc(getBar().name)} · ${esc(getBar().meeting)}</div>
      <div class="hero-actions">
        <button class="primary-btn ${joined() ? 'joined' : ''}" data-action="rsvp">${joined() ? '✓ Я ИДУ' : 'ИДУ НА ПРОСМОТР'}</button>
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
  return `<section class="page">
    <div class="eyebrow">Matchday together</div>
    <h1 class="page-title">Просмотры</h1>
    <p class="page-subtitle">Все совместные матчи фан-клуба: где встречаемся, когда приходить и кто уже идёт.</p>

    <article class="watch-feature">
      <div><span class="eyebrow">20 сентября · Serie A</span><h2>Milan<br>vs Lecce</h2><p>${esc(getBar().name)} · Санкт-Петербург<br>${esc(getBar().address)}<br>${esc(getBar().meeting)} · Начало: 21:45 МСК</p></div>
      <div>
        <div class="watch-stats">
          <div class="watch-stat"><strong>34</strong><span>уже идут</span></div>
          <div class="watch-stat"><strong>60м</strong><span>до матча</span></div>
          <div class="watch-stat"><strong>SPB</strong><span>наш бар</span></div>
        </div>
        <button style="margin-top:10px" class="primary-btn ${joined()?'joined':''}" data-action="rsvp">${joined()?'✓ ВЫ В СПИСКЕ':'ПРИСОЕДИНИТЬСЯ'}</button>
      </div>
    </article>

    <div class="section-head"><h2>Следующие просмотры</h2></div>
    <div class="fixture-list">${fixtures.filter(f=>f.watched && f!==fixtures[0]).map(f=>`
      <article class="fixture">
        <div class="fixture-date"><strong>${f.date}</strong><span>${f.month}</span></div>
        <div class="fixture-main"><strong>${esc(f.home)} — ${esc(f.away)}</strong><span>${esc(f.competition)} · ${esc(getBar().name)}</span></div>
        <div class="fixture-side"><strong>${esc(f.time)}</strong><span>● FAN CLUB</span></div>
      </article>`).join('')}</div>
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
    <div class="timeline">
      <div class="timeline-item"><div class="timeline-year">START</div><div class="timeline-copy"><strong>Первый совместный просмотр</strong><p>Здесь будет год основания, место первого сбора и короткая история появления фан-клуба.</p></div></div>
      <div class="timeline-item"><div class="timeline-year">NEXT</div><div class="timeline-copy"><strong>Фан-клуб растёт</strong><p>Добавим важные выезды, большие дерби, памятные матчи и события сообщества.</p></div></div>
      <div class="timeline-item"><div class="timeline-year">NOW</div><div class="timeline-copy"><strong>Новая цифровая глава</strong><p>Приложение объединяет календарь, просмотры, историю, бар и участников клуба.</p></div></div>
    </div>
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
      <button class="edit-chip" data-action="edit-bar">Изменить</button>
    </div>
    <p class="page-subtitle">${esc(bar.address)}<br>${esc(bar.meeting)}</p>
    <div class="bar-actions">
      ${bar.mapUrl ? `<a class="secondary-wide link-button" href="${esc(bar.mapUrl)}" target="_blank" rel="noopener">Открыть карту ↗</a>` : ''}
    </div>
    <div class="notice">Название бара и адрес можно менять прямо здесь. В этой версии настройки сохраняются на текущем устройстве; в рабочем приложении перенесём их в админку.</div>
    <div class="section-head"><h2>Меню</h2></div>
    ${Object.entries(menu).map(([section,items])=>`<div class="menu-section"><h3>${section}</h3><div class="menu-list">${items.map(i=>`<div class="menu-card"><div><strong>${i[0]}</strong>${i[1]?`<span>${i[1]}</span>`:''}</div><b>${i[2]}</b></div>`).join('')}</div></div>`).join('')}
  </section>`;
}

function renderContacts() {
  return `<section class="page">
    <div class="eyebrow">Всегда на связи</div>
    <h1 class="page-title">Контакты</h1>
    <p class="page-subtitle">Сюда подставим реальные Telegram-ссылки и роли организаторов.</p>
    <div class="contact-list">${contacts.map(c=>`<article class="contact-card"><div class="avatar">${c.initials}</div><div class="contact-copy"><strong>${c.name}</strong><span>${c.role}</span></div><button data-action="contact">Написать</button></article>`).join('')}</div>
  </section>`;
}

function renderProfile() {
  return `<section class="page">
    <div class="eyebrow">Rossoneri ID</div>
    <h1 class="page-title">Профиль</h1>
    <p class="page-subtitle">Здесь позже будет Telegram-авторизация, реальная статистика посещений и цифровая карта участника.</p>
    <article class="profile-card">
      <div class="member-number">Milan Club San Pietroburgo · #0189</div>
      <div class="member-name">Milanista</div>
      <div class="stats-grid">
        <div class="stat-card"><strong>0</strong><span>просмотров</span></div>
        <div class="stat-card"><strong>—</strong><span>любимый игрок</span></div>
      </div>
      <div style="margin-top:18px"><span style="font-size:11px;color:var(--muted)">Путь участника</span><div class="progress"><span></span></div></div>
      <div class="notice">В следующей версии профиль будет автоматически брать имя и фото из Telegram Mini App.</div>
    </article>
  </section>`;
}

const routes = { home:renderHome, matches:renderMatches, watch:renderWatch, club:renderClub, more:renderMore, bar:renderBar, contacts:renderContacts, profile:renderProfile };

function render(route=currentRoute) {
  currentRoute = route;
  app.innerHTML = (routes[route] || renderHome)();
  document.querySelectorAll('.nav-item').forEach(b => b.classList.toggle('active', b.dataset.route===route));
  window.scrollTo({top:0, behavior:'instant'});
}

function toast(message) {
  let el = document.querySelector('.toast');
  if(!el){ el=document.createElement('div'); el.className='toast'; document.body.appendChild(el); }
  el.textContent=message; el.classList.add('show'); clearTimeout(window.__toast); window.__toast=setTimeout(()=>el.classList.remove('show'),1800);
}

document.addEventListener('click', e => {
  const route = e.target.closest('[data-route]');
  if(route){ render(route.dataset.route); return; }
  const f = e.target.closest('[data-filter]');
  if(f){ filter=f.dataset.filter; render('matches'); return; }
  const action = e.target.closest('[data-action]')?.dataset.action;
  if(action==='rsvp'){
    const value = joined() ? '0' : '1'; localStorage.setItem('milanclub:rsvp:lecce', value); render(currentRoute); toast(value==='1'?'Вы добавлены в список просмотра':'Вы отменили участие');
  }
  if(action==='edit-bar'){ editingBar = true; render('bar'); }
  if(action==='cancel-bar-edit'){ editingBar = false; render('bar'); }
  if(action==='contact') toast('Добавим реальные Telegram-ссылки');
});

document.addEventListener('submit', e => {
  if(e.target.id !== 'barForm') return;
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target).entries());
  saveBar({
    name: (data.name || '').trim() || defaultBar.name,
    address: (data.address || '').trim() || defaultBar.address,
    meeting: (data.meeting || '').trim() || defaultBar.meeting,
    mapUrl: (data.mapUrl || '').trim()
  });
  editingBar = false;
  render('bar');
  toast('Бар сохранён');
});

render('home');
