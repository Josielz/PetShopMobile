const DEFAULT_PORT = 3000;

function parsePort(value) {
  const port = Number(value);

  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error('PORT deve ser um número inteiro entre 1 e 65535.');
  }

  return port;
}

const port = parsePort(process.env.PORT ?? DEFAULT_PORT);

module.exports = { port };
