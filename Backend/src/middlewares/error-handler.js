function errorHandler(error, _request, response, _next) {
  const statusCode = Number.isInteger(error.statusCode)
    ? error.statusCode
    : 500;

  // Erros internos usam uma mensagem genérica para não revelar detalhes sensíveis.
  const message =
    statusCode >= 500 ? 'Erro interno do servidor.' : error.message;

  return response.status(statusCode).json({ message });
}

module.exports = { errorHandler };
