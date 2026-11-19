const { AppError } = require('../../errors/app-error');
const {
  getServiceById,
  listServices,
} = require('./servicos.service');

function parseServiceId(value) {
  if (!/^[1-9]\d*$/.test(value)) {
    throw new AppError('ID do serviço inválido.', 400);
  }

  return value;
}

async function index(_request, response) {
  const servicos = await listServices();

  return response.status(200).json({ servicos });
}

async function show(request, response) {
  const serviceId = parseServiceId(request.params.id);
  const servico = await getServiceById(serviceId);

  return response.status(200).json({ servico });
}

module.exports = { index, show };
