const express = require('express');

const { errorHandler } = require('./middlewares/error-handler');
const { notFound } = require('./middlewares/not-found');
const healthRoutes = require('./modules/health/health.routes');

const app = express();

app.use(express.json());
app.use('/health', healthRoutes);
app.use(notFound);
app.use(errorHandler);

module.exports = app;
