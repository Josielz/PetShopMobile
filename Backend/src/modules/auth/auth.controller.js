const { AppError } = require('../../errors/app-error');
const { getCurrentUser, loginUser } = require('./auth.service');

function getLoginCredentials(body = {}) {
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const password = typeof body.password === 'string' ? body.password : '';

  if (!email || !password) {
    throw new AppError('E-mail e senha são obrigatórios.', 400);
  }

  return { email, password };
}

async function login(request, response) {
  const credentials = getLoginCredentials(request.body);
  const authentication = await loginUser(credentials);

  return response.status(200).json(authentication);
}

async function me(request, response) {
  const user = await getCurrentUser(request.auth.user);

  return response.status(200).json({ user });
}

module.exports = { login, me };
