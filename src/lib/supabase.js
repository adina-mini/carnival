import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  !supabaseUrl.includes('your-project') &&
  !supabaseAnonKey.includes('your-anon-key')
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Local persistent store keys for offline / demo mode
const LOCAL_STORAGE_KEY = 'shadii_platform_invitations';
const LOCAL_RSVP_KEY = 'shadii_platform_rsvps';

// In-memory fallback for server-side execution if no Supabase configured
if (typeof globalThis !== 'undefined' && !globalThis.__SHADII_STORE__) {
  globalThis.__SHADII_STORE__ = new Map();
}
if (typeof globalThis !== 'undefined' && !globalThis.__SHADII_RSVPS__) {
  globalThis.__SHADII_RSVPS__ = new Map();
}

const getStore = () => {
  if (typeof window !== 'undefined') {
    try {
      const data = localStorage.getItem(LOCAL_STORAGE_KEY);
      return data ? JSON.parse(data) : {};
    } catch (e) {
      return {};
    }
  }
  return Object.fromEntries(globalThis.__SHADII_STORE__ || []);
};

const setStore = (store) => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(store));
    } catch (e) {}
  } else if (globalThis.__SHADII_STORE__) {
    globalThis.__SHADII_STORE__ = new Map(Object.entries(store));
  }
};

const getRsvpStore = () => {
  if (typeof window !== 'undefined') {
    try {
      const data = localStorage.getItem(LOCAL_RSVP_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }
  return Array.from(globalThis.__SHADII_RSVPS__?.values() || []);
};

const setRsvpStore = (list) => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(LOCAL_RSVP_KEY, JSON.stringify(list));
    } catch (e) {}
  } else if (globalThis.__SHADII_RSVPS__) {
    globalThis.__SHADII_RSVPS__ = new Map(list.map((r) => [r.id, r]));
  }
};

/**
 * Save or update an invitation
 */
export async function saveInvitation(invitation) {
  const record = {
    ...invitation,
    updated_at: new Date().toISOString(),
  };

  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('invitations')
      .upsert({
        id: record.id,
        template_id: record.template_id,
        title: record.title || 'Wedding Invitation',
        event_type: record.event_type || 'nikkah',
        status: record.status || 'draft',
        user_id: record.user_id || null,
        data: record.data,
        media: record.media || {},
        updated_at: record.updated_at,
        published_at: record.published_at || null,
      })
      .select()
      .single();

    if (error) {
      console.warn('Supabase save error, falling back to local store:', error.message);
    } else {
      return data;
    }
  }

  // Fallback to local / memory store
  const store = getStore();
  store[record.id] = record;
  setStore(store);
  return record;
}

/**
 * Fetch an invitation by unique ID or slug
 */
export async function getInvitationById(id) {
  if (!id) return null;

  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('invitations')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (!error && data) {
      return data;
    }
  }

  // Fallback
  const store = getStore();
  return store[id] || null;
}

/**
 * List all invitations for current device or authenticated user
 */
export async function listUserInvitations(userId = null) {
  if (isSupabaseConfigured && supabase) {
    let query = supabase.from('invitations').select('*').order('updated_at', { ascending: false });
    if (userId) {
      query = query.eq('user_id', userId);
    }
    const { data, error } = await query;

    if (!error && data) {
      return data;
    }
  }

  const store = getStore();
  const all = Object.values(store);
  if (userId) {
    const userOnly = all.filter((item) => item.user_id === userId || !item.user_id);
    return userOnly.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
  }
  return all.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
}

/**
 * Delete an invitation
 */
export async function deleteInvitation(id) {
  if (isSupabaseConfigured && supabase) {
    await supabase.from('invitations').delete().eq('id', id);
  }
  const store = getStore();
  delete store[id];
  setStore(store);
  return true;
}

/**
 * Submit guest RSVP
 */
export async function submitRsvp(rsvpData) {
  const record = {
    id: `rsvp-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    ...rsvpData,
    created_at: new Date().toISOString(),
  };

  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('rsvps')
      .insert({
        invitation_id: record.invitation_id,
        guest_name: record.guest_name,
        guest_phone: record.guest_phone || null,
        attendance: record.attendance || 'attending',
        guest_count: record.guest_count ? parseInt(record.guest_count, 10) : 1,
        notes: record.notes || null,
      })
      .select()
      .single();

    if (!error && data) {
      return data;
    }
  }

  // Fallback to local store
  const store = getRsvpStore();
  store.push(record);
  setRsvpStore(store);
  return record;
}

/**
 * List all RSVPs for an invitation
 */
export async function listRsvpsForInvitation(invitationId) {
  if (!invitationId) return [];

  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('rsvps')
      .select('*')
      .eq('invitation_id', invitationId)
      .order('created_at', { ascending: false });

    if (!error && data) {
      return data;
    }
  }

  // Fallback
  const store = getRsvpStore();
  return store
    .filter((r) => r.invitation_id === invitationId)
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
}
