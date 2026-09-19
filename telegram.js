(() => {
  const tg = window.Telegram?.WebApp || null;

  function isInsideTelegram() {
    return Boolean(tg && tg.initData);
  }

  function user() {
    return tg?.initDataUnsafe?.user || null;
  }

  function fullName() {
    const u = user();
    if (!u) return 'Milanista';
    return [u.first_name, u.last_name].filter(Boolean).join(' ') || u.username || 'Milanista';
  }

  function setStaticViewportHeight() {
    const h = Math.round(tg?.viewportStableHeight || window.innerHeight || document.documentElement.clientHeight || 0);
    if (h > 0) document.documentElement.style.setProperty('--app-static-height', `${h}px`);
  }

  function init() {
    if (!tg) {
      setStaticViewportHeight();
      return;
    }
    try {
      tg.ready();
      tg.expand();
      tg.setHeaderColor?.('#080808');
      tg.setBackgroundColor?.('#080808');
      tg.setBottomBarColor?.('#080808');
      tg.disableVerticalSwipes?.();
      document.body.classList.add('telegram-miniapp');
      window.requestAnimationFrame(setStaticViewportHeight);
      window.setTimeout(setStaticViewportHeight, 180);
      window.addEventListener('orientationchange', () => window.setTimeout(setStaticViewportHeight, 350), {passive:true});
    } catch (_) {
      setStaticViewportHeight();
    }
  }

  function showBack(show) {
    if (!tg?.BackButton) return;
    try { show ? tg.BackButton.show() : tg.BackButton.hide(); } catch (_) {}
  }

  function onBack(handler) {
    if (!tg?.BackButton?.onClick) return;
    try { tg.BackButton.onClick(handler); } catch (_) {}
  }

  function haptic(type = 'selection') {
    try {
      if (type === 'success') tg?.HapticFeedback?.notificationOccurred?.('success');
      else if (type === 'error') tg?.HapticFeedback?.notificationOccurred?.('error');
      else tg?.HapticFeedback?.selectionChanged?.();
    } catch (_) {}
  }

  function open(url) {
    if (!url) return;
    try {
      if (url.startsWith('https://t.me/') || url.startsWith('tg://')) tg?.openTelegramLink?.(url);
      else tg?.openLink?.(url);
      return;
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
    tg,
    init,
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
