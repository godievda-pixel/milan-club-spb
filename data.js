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
    const initData = window.Telegram?.WebApp?.initData || '';
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
    claimAdmin: (code) => api('claim_admin', { code }),
    updateVenue: (venue) =>
      api('admin_update_venue', {
        venue_id: venue.id,
        name: venue.name,
        address: venue.address,
        meeting_note: venue.meeting,
        map_url: venue.mapUrl
      }),
    updateSettings: (settings) => api('admin_update_settings', settings),
    saveWatchParty: (payload) => api('admin_save_watch_party', payload),
    saveMenuCategory: (payload) => api('admin_save_menu_category', payload),
    saveMenuItem: (payload) => api('admin_save_menu_item', payload),
    saveContact: (payload) => api('admin_save_contact', payload),
    saveHistory: (payload) => api('admin_save_history', payload),
    api
  };
})();