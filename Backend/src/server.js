const app = require('./app');
const { port } = require('./config/environment');

app.listen(port, () => {
  console.log(`Servidor executando na porta ${port}.`);
});
