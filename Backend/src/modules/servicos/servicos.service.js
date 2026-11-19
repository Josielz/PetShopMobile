const { AppError } = require('../../errors/app-error');
const {
  findAllServices,
  findServiceById,
} = require('./servicos.repository');

async function listServices() {
  const { data, error } = await findAllServices();

  if (error) {
    throw new AppError('Não foi possível consultar os serviços.', 503);
  }

  return data;
}

async function getServiceById(serviceId) {
  const { data, error } = await findServiceById(serviceId);

  if (error) {
    throw new AppError('Não foi possível consultar o serviço.', 503);
  }

  if (!data) {
    throw new AppError('Serviço não encontrado.', 404);
  }

  return data;
}

module.exports = { getServiceById, listServices };
