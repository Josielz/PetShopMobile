const assert = require('node:assert/strict');
const { after, before, test } = require('node:test');

process.env.SUPABASE_URL = 'https://example.supabase.co';
process.env.SUPABASE_SERVICE_ROLE_KEY = 'test-service-role-key';

const app = require('../src/app');
const { supabaseAdmin } = require('../src/config/supabase');

const ACCESS_TOKEN = 'token-de-teste';
const AUTHENTICATED_USER = {
  id: '00000000-0000-0000-0000-000000000001',
};
const SERVICE = {
  ativo: true,
  id: 1,
  nome: 'Banho',
  preco: 0,
};

let baseUrl;
let server;

function mockAuthentication(context) {
  context.mock.method(
    supabaseAdmin.auth,
    'getUser',
    async (accessToken) => {
      assert.equal(accessToken, ACCESS_TOKEN);
      return { data: { user: AUTHENTICATED_USER }, error: null };
    },
  );
}

function authenticatedRequest(path) {
  return fetch(`${baseUrl}${path}`, {
    headers: { authorization: `Bearer ${ACCESS_TOKEN}` },
  });
}

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

test('GET /servicos exige autenticação', async () => {
  const response = await fetch(`${baseUrl}/servicos`);

  assert.equal(response.status, 401);
});

test('GET /servicos lista os serviços', async (context) => {
  mockAuthentication(context);
  context.mock.method(supabaseAdmin, 'from', (table) => {
    assert.equal(table, 'servicos');

    return {
      select(fields) {
        assert.equal(fields, 'id, nome, preco, ativo');

        return {
          async order(column, options) {
            assert.equal(column, 'id');
            assert.deepEqual(options, { ascending: true });
            return { data: [SERVICE], error: null };
          },
        };
      },
    };
  });

  const response = await authenticatedRequest('/servicos');

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { servicos: [SERVICE] });
});

test('GET /servicos retorna 503 quando a consulta falha', async (context) => {
  mockAuthentication(context);
  context.mock.method(supabaseAdmin, 'from', () => ({
    select: () => ({
      async order() {
        return { data: null, error: { message: 'database error' } };
      },
    }),
  }));

  const response = await authenticatedRequest('/servicos');

  assert.equal(response.status, 503);
  assert.deepEqual(await response.json(), {
    message: 'Erro interno do servidor.',
  });
});

test('GET /servicos/:id retorna o serviço', async (context) => {
  mockAuthentication(context);
  context.mock.method(supabaseAdmin, 'from', () => ({
    select: () => ({
      eq: (column, value) => {
        assert.equal(column, 'id');
        assert.equal(value, '1');

        return {
          async maybeSingle() {
            return { data: SERVICE, error: null };
          },
        };
      },
    }),
  }));

  const response = await authenticatedRequest('/servicos/1');

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { servico: SERVICE });
});

test('GET /servicos/:id rejeita ID inválido', async (context) => {
  mockAuthentication(context);

  const response = await authenticatedRequest('/servicos/invalido');

  assert.equal(response.status, 400);
  assert.deepEqual(await response.json(), {
    message: 'ID do serviço inválido.',
  });
});

test('GET /servicos/:id retorna 404 para serviço ausente', async (context) => {
  mockAuthentication(context);
  context.mock.method(supabaseAdmin, 'from', () => ({
    select: () => ({
      eq: () => ({
        async maybeSingle() {
          return { data: null, error: null };
        },
      }),
    }),
  }));

  const response = await authenticatedRequest('/servicos/999');

  assert.equal(response.status, 404);
  assert.deepEqual(await response.json(), {
    message: 'Serviço não encontrado.',
  });
});
