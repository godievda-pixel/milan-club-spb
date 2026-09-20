(() => {
  function getTG() {
    return window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
  }

  let desiredBackVisible = false;
  let backHandler = null;
  let boundBackButton = null;
  let boundBackWrapper = null;

  function syncBackButton() {
    const tg = getTG();
    const backButton = tg && tg.BackButton;
    if (!backButton) {
      nativePostEvent('web_app_setup_back_button', {is_visible: desiredBackVisible});
      return false;
    }

    try {
      if (boundBackButton !== backButton) {
        if (boundBackButton && boundBackWrapper && typeof boundBackButton.offClick === 'function') {
          try { boundBackButton.offClick(boundBackWrapper); } catch (_) {}
        }

        boundBackButton = backButton;
        boundBackWrapper = function () {
          if (typeof backHandler === 'function') backHandler();
        };

        if (typeof backButton.onClick === 'function') {
          backButton.onClick(boundBackWrapper);
        }
      }

      if (desiredBackVisible) backButton.show();
      else backButton.hide();
      return true;
    } catch (_) {
      return false;
    }
  }

  function launchValue(name) {
    try {
      const hash = new URLSearchParams(String(window.location.hash || '').replace(/^#/, ''));
      const search = new URLSearchParams(String(window.location.search || '').replace(/^\?/, ''));
      return hash.get(name) || search.get(name) || '';
    } catch (_) {
      return '';
    }
  }

  function fallbackInitData() {
    return launchValue('tgWebAppData') || '';
  }

  function initData() {
    const tg = getTG();
    return (tg && tg.initData) || fallbackInitData();
  }

  function fallbackUser() {
    const raw = fallbackInitData();
    if (!raw) return null;
    try {
      const params = new URLSearchParams(raw);
      const userRaw = params.get('user');
      return userRaw ? JSON.parse(userRaw) : null;
    } catch (_) {
      return null;
    }
  }

  function user() {
    const tg = getTG();
    return (tg && tg.initDataUnsafe && tg.initDataUnsafe.user) || fallbackUser();
  }

  function isInsideTelegram() {
    return Boolean(initData());
  }

  function fullName() {
    const u = user();
    if (!u) return 'Milanista';
    return [u.first_name, u.last_name].filter(Boolean).join(' ') || u.username || 'Milanista';
  }

  function nativePostEvent(eventType, eventData) {
    const serialized = eventData == null ? '' : JSON.stringify(eventData);
    try {
      if (window.TelegramWebviewProxy && typeof window.TelegramWebviewProxy.postEvent === 'function') {
        window.TelegramWebviewProxy.postEvent(eventType, serialized);
        return true;
      }
      if (window.external && typeof window.external.notify === 'function') {
        window.external.notify(JSON.stringify({eventType, eventData: eventData || null}));
        return true;
      }
    } catch (_) {}
    return false;
  }

  function readyNative() {
    nativePostEvent('web_app_ready');
  }

  function expandNative() {
    nativePostEvent('web_app_expand');
  }

  function setStaticViewportHeight() {
    const tg = getTG();
    const h = Math.round((tg && tg.viewportStableHeight) || window.innerHeight || document.documentElement.clientHeight || 0);
    if (h > 0) document.documentElement.style.setProperty('--app-static-height', h + 'px');
  }

  function configureSdk() {
    const tg = getTG();
    if (!tg) return false;
    try {
      tg.ready();
      tg.expand();
      if (tg.setHeaderColor) tg.setHeaderColor('#080808');
      if (tg.setBackgroundColor) tg.setBackgroundColor('#080808');
      if (tg.setBottomBarColor) tg.setBottomBarColor('#080808');
      if (tg.disableVerticalSwipes) tg.disableVerticalSwipes();
      syncBackButton();
      return true;
    } catch (_) {
      return false;
    }
  }

  function markPlatformClass() {
    try {
      const ua = navigator.userAgent || '';
      const isIOS = /iPad|iPhone|iPod/.test(ua) ||
        (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
      if (isIOS) document.body.classList.add('ios-miniapp');
    } catch (_) {}
  }

  function init() {
    markPlatformClass();

    // Remove Telegram's native loading placeholder even if the external SDK
    // is delayed or unavailable on a particular Android WebView.
    readyNative();
    expandNative();

    configureSdk();
    document.body.classList.add('telegram-miniapp');
    setStaticViewportHeight();

    window.requestAnimationFrame(setStaticViewportHeight);

    [120, 350, 750, 1500, 3000, 6000].forEach((delay) => {
      window.setTimeout(() => {
        configureSdk();
        syncBackButton();
        setStaticViewportHeight();
      }, delay);
    });

    window.addEventListener('orientationchange', () => window.setTimeout(() => {
      setStaticViewportHeight();
      syncBackButton();
    }, 350), {passive:true});
  }

  function showBack(show) {
    desiredBackVisible = Boolean(show);
    syncBackButton();
  }

  function onBack(handler) {
    backHandler = typeof handler === 'function' ? handler : null;
    syncBackButton();
  }

  function haptic(type = 'selection') {
    const tg = getTG();
    try {
      if (type === 'success' && tg && tg.HapticFeedback && tg.HapticFeedback.notificationOccurred) {
        tg.HapticFeedback.notificationOccurred('success');
      } else if (type === 'error' && tg && tg.HapticFeedback && tg.HapticFeedback.notificationOccurred) {
        tg.HapticFeedback.notificationOccurred('error');
      } else if (tg && tg.HapticFeedback && tg.HapticFeedback.selectionChanged) {
        tg.HapticFeedback.selectionChanged();
      }
    } catch (_) {}
  }

  function open(url) {
    if (!url) return;
    const tg = getTG();

    try {
      if ((url.startsWith('https://t.me/') || url.startsWith('tg://')) && tg && tg.openTelegramLink) {
        tg.openTelegramLink(url);
        return;
      }
      if (tg && tg.openLink) {
        tg.openLink(url);
        return;
      }
    } catch (_) {}

    try {
      if (url.startsWith('https://t.me/')) {
        const parsed = new URL(url);
        if (nativePostEvent('web_app_open_tg_link', {path_full: parsed.pathname + parsed.search})) return;
      } else if (nativePostEvent('web_app_open_link', {url})) {
        return;
      }
    } catch (_) {}

    window.open(url, '_blank', 'noopener');
  }

  function applyProfileChip() {
    const u = user();
    const chip = document.querySelector('.profile-chip');
    if (!chip || !u) return;
    const label = chip.querySelector('.profile-label');
    const img = chip.querySelector('.profile-photo');
    const dot = chip.querySelector('.profile-dot');
    const icon = chip.querySelector('.profile-chip-icon');
    if (label) label.textContent = u.first_name || u.username || 'Профиль';
    if (u.photo_url && img) {
      img.src = u.photo_url;
      img.hidden = false;
      if (dot) dot.hidden = true;
      if (icon) icon.hidden = true;
    }
  }

  window.MilanTelegram = {
    get tg() { return getTG(); },
    init,
    initData,
    user,
    fullName,
    isInsideTelegram,
    showBack,
    onBack,
    haptic,
    open,
    applyProfileChip
  };
})();
