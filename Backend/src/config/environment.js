const path = require('node:path');

require('dotenv').config({
  path: path.resolve(__dirname, '../../.env'),
  quiet: true,
});

const DEFAULT_PORT = 3000;

function parsePort(value) {
  const port = Number(value);

  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error('PORT deve ser um número inteiro entre 1 e 65535.');
  }

  return port;
}

const port = parsePort(process.env.PORT ?? DEFAULT_PORT);

function getRequiredEnvironmentVariable(name) {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`A variável de ambiente ${name} não foi configurada.`);
  }

  return value;
}

function getSupabaseConfig() {
  return {
    url: getRequiredEnvironmentVariable('SUPABASE_URL'),
    serviceRoleKey: getRequiredEnvironmentVariable(
      'SUPABASE_SERVICE_ROLE_KEY',
    ),
  };
}

module.exports = { getSupabaseConfig, port };
