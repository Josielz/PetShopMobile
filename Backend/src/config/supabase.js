const { createClient } = require('@supabase/supabase-js');

const { getSupabaseConfig } = require('./environment');

const { serviceRoleKey, url } = getSupabaseConfig();

const serverAuthOptions = {
  autoRefreshToken: false,
  detectSessionInUrl: false,
  persistSession: false,
};

function createSupabaseAuthClient() {
  return createClient(url, serviceRoleKey, { auth: serverAuthOptions });
}

const supabaseAdmin = createClient(url, serviceRoleKey, {
  auth: serverAuthOptions,
});

module.exports = { createSupabaseAuthClient, supabaseAdmin };
