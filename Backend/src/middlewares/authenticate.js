const { AppError } = require('../errors/app-error');
const { validateAccessToken } = require('../modules/auth/auth.service');

function extractBearerToken(authorizationHeader) {
  const match = authorizationHeader?.match(/^Bearer\s+(\S+)$/i);

  if (!match) {
    throw new AppError('Token de acesso não informado.', 401);
  }

  return match[1];
}

async function authenticate(request, _response, next) {
  const accessToken = extractBearerToken(request.get('authorization'));
  const user = await validateAccessToken(accessToken);

  request.auth = { user };
  next();
}

module.exports = { authenticate };
