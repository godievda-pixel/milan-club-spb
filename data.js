(() => {
  const SUPABASE_URL = 'https://lcnwccnkkxaosxnfvjvr.supabase.co';
  const SUPABASE_KEY = 'sb_publishable_ZqBVy-GIs0swsIZoFQoMJQ_3JVivZGh';
  const API_URL = `${SUPABASE_URL}/functions/v1/milan-api`;

  async function publicBootstrap() {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/mc_public_bootstrap`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_KEY,
        'content-type': 'application/json'
      },
      body: '{}'
    });
    if (!response.ok) throw new Error(`Supabase bootstrap: ${response.status}`);
    return response.json();
  }

  async function api(action, payload = {}) {
    const initData = window.MilanTelegram?.initData?.() || window.Telegram?.WebApp?.initData || '';
    if (!initData) throw new Error('Откройте приложение из Telegram');

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-telegram-init-data': initData
      },
      body: JSON.stringify({ action, ...payload })
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok || !data?.ok) throw new Error(data?.error || `API error: ${response.status}`);
    return data;
  }

  window.MilanBackend = {
    publicBootstrap,
    me: () => api('me'),
    rsvp: (watchPartyId, status, guests = 0) =>
      api('rsvp', { watch_party_id: watchPartyId, status, guests }),
    watchParticipants: (watchPartyId) =>
      api('watch_participants', { watch_party_id: watchPartyId }),
    attendanceRanking: () => api('attendance_ranking'),
    setAttendance: (watchPartyId, telegramUserId, attendanceStatus) =>
      api('admin_set_attendance', {
        watch_party_id: watchPartyId,
        telegram_user_id: telegramUserId,
        attendance_status: attendanceStatus
      }),
    searchUsers: (watchPartyId, query = '') =>
      api('admin_search_users', { watch_party_id: watchPartyId, query }),
    addParticipant: (watchPartyId, telegramUserId) =>
      api('admin_add_participant', {
        watch_party_id: watchPartyId,
        telegram_user_id: telegramUserId
      }),
    claimAdmin: (code) => api('claim_admin', { code }),
    updateProfile: (payload) => api('update_profile', payload),
    updateVenue: (venue) =>
      api('admin_update_venue', {
        venue_id: venue.id,
        name: venue.name,
        address: venue.address,
        meeting_note: venue.meeting,
        map_url: venue.mapUrl,
        menu_url: venue.menuUrl
      }),
    updateSettings: (settings) => api('admin_update_settings', settings),
    saveWatchParty: (payload) => api('admin_save_watch_party', payload),
    setWatchStatus: (watchPartyId, collectionStatus, cancelReason = '') =>
      api('admin_set_watch_status', {
        watch_party_id: watchPartyId,
        collection_status: collectionStatus,
        cancel_reason: cancelReason
      }),
    saveMenuCategory: (payload) => api('admin_save_menu_category', payload),
    saveMenuItem: (payload) => api('admin_save_menu_item', payload),
    saveContact: (payload) => api('admin_save_contact', payload),
    saveHistory: (payload) => api('admin_save_history', payload),
    api
  };
})();