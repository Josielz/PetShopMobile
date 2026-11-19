const {
  createSupabaseAuthClient,
  supabaseAdmin,
} = require('../../config/supabase');

async function signInWithPassword(credentials) {
  const supabaseAuth = createSupabaseAuthClient();

  return supabaseAuth.auth.signInWithPassword(credentials);
}

async function getUserByAccessToken(accessToken) {
  return supabaseAdmin.auth.getUser(accessToken);
}

module.exports = { getUserByAccessToken, signInWithPassword };
