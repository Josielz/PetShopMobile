async function checkSupabaseConnection() {
  const { supabaseAdmin } = require('../config/supabase');

  const { error } = await supabaseAdmin
    .from('servicos')
    .select('id', { head: true })
    .limit(1);

  if (error) {
    throw new Error(
      'Não foi possível consultar o Supabase. Verifique a URL, a chave e o estado das migrations.',
    );
  }

  console.log('Conexão com o Supabase validada com sucesso.');
}

checkSupabaseConnection().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
