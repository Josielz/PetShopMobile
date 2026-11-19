const { supabaseAdmin } = require('../../config/supabase');

async function findProfileByUserId(userId) {
  return supabaseAdmin
    .from('perfis')
    .select('id, nome, tipo, created_at')
    .eq('id', userId)
    .maybeSingle();
}

module.exports = { findProfileByUserId };
