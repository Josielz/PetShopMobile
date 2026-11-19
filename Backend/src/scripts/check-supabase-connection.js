async function checkSupabaseConnection() {
  const { supabase } = require('../config/supabase');

  const { error } = await supabase
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
