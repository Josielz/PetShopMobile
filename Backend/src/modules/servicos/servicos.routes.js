const { Router } = require('express');

const { authenticate } = require('../../middlewares/authenticate');
const { index, show } = require('./servicos.controller');

const servicosRoutes = Router();

servicosRoutes.use(authenticate);
servicosRoutes.get('/', index);
servicosRoutes.get('/:id', show);

module.exports = servicosRoutes;
