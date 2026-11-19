const { supabaseAdmin } = require('../../config/supabase');

const SERVICE_FIELDS = 'id, nome, preco, ativo';

async function findAllServices() {
  return supabaseAdmin
    .from('servicos')
    .select(SERVICE_FIELDS)
    .order('id', { ascending: true });
}

async function findServiceById(serviceId) {
  return supabaseAdmin
    .from('servicos')
    .select(SERVICE_FIELDS)
    .eq('id', serviceId)
    .maybeSingle();
}

module.exports = { findAllServices, findServiceById };
