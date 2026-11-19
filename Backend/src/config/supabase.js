const { createClient } = require('@supabase/supabase-js');

const { getSupabaseConfig } = require('./environment');

const { serviceRoleKey, url } = getSupabaseConfig();

const supabase = createClient(url, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    detectSessionInUrl: false,
    persistSession: false,
  },
});

module.exports = { supabase };
