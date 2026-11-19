const { AppError } = require('../../errors/app-error');
const {
  getUserByAccessToken,
  signInWithPassword,
} = require('./auth.repository');
const { findProfileByUserId } = require('./profile.repository');

function formatUser(user, profile) {
  return {
    id: user.id,
    email: user.email,
    nome: profile.nome,
    tipo: profile.tipo,
    createdAt: profile.created_at,
  };
}

async function getProfile(user) {
  const { data: profile, error } = await findProfileByUserId(user.id);

  if (error) {
    throw new AppError('Não foi possível consultar o perfil.', 503);
  }

  if (!profile) {
    throw new AppError('Perfil do usuário não encontrado.', 404);
  }

  return formatUser(user, profile);
}

async function loginUser(credentials) {
  const { data, error } = await signInWithPassword(credentials);

  if (error || !data.session || !data.user) {
    throw new AppError('E-mail ou senha inválidos.', 401);
  }

  const user = await getProfile(data.user);

  return {
    accessToken: data.session.access_token,
    refreshToken: data.session.refresh_token,
    expiresAt: data.session.expires_at,
    user,
  };
}

async function validateAccessToken(accessToken) {
  const { data, error } = await getUserByAccessToken(accessToken);

  if (error || !data.user) {
    throw new AppError('Token de acesso inválido ou expirado.', 401);
  }

  return data.user;
}

async function getCurrentUser(user) {
  return getProfile(user);
}

module.exports = { getCurrentUser, loginUser, validateAccessToken };
