const assert = require('node:assert/strict');
const { after, before, test } = require('node:test');

process.env.SUPABASE_URL = 'https://example.supabase.co';
process.env.SUPABASE_SERVICE_ROLE_KEY = 'test-service-role-key';

const app = require('../src/app');

let baseUrl;
let server;

before(
  () =>
    new Promise((resolve) => {
      server = app.listen(0, '127.0.0.1', () => {
        const { port } = server.address();
        baseUrl = `http://127.0.0.1:${port}`;
        resolve();
      });
    }),
);

after(
  () =>
    new Promise((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    }),
);

test('POST /auth/login exige e-mail e senha', async () => {
  const response = await fetch(`${baseUrl}/auth/login`, {
    body: JSON.stringify({ email: 'usuario@exemplo.com' }),
    headers: { 'content-type': 'application/json' },
    method: 'POST',
  });

  assert.equal(response.status, 400);
  assert.deepEqual(await response.json(), {
    message: 'E-mail e senha são obrigatórios.',
  });
});

test('GET /auth/me exige token Bearer', async () => {
  const response = await fetch(`${baseUrl}/auth/me`);

  assert.equal(response.status, 401);
  assert.deepEqual(await response.json(), {
    message: 'Token de acesso não informado.',
  });
});
