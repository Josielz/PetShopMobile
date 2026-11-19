const express = require('express');

const { errorHandler } = require('./middlewares/error-handler');
const { notFound } = require('./middlewares/not-found');
const authRoutes = require('./modules/auth/auth.routes');
const healthRoutes = require('./modules/health/health.routes');
const servicosRoutes = require('./modules/servicos/servicos.routes');

const app = express();

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/health', healthRoutes);
app.use('/servicos', servicosRoutes);
app.use(notFound);
app.use(errorHandler);

module.exports = app;
