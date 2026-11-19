const { Router } = require('express');

const { checkHealth } = require('./health.controller');

const healthRoutes = Router();

healthRoutes.get('/', checkHealth);

module.exports = healthRoutes;
