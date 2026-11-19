const { Router } = require('express');

const { authenticate } = require('../../middlewares/authenticate');
const { login, me } = require('./auth.controller');

const authRoutes = Router();

authRoutes.post('/login', login);
authRoutes.get('/me', authenticate, me);

module.exports = authRoutes;
