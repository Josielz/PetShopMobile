function errorHandler(_error, _request, response, _next) {
  // Evita expor detalhes internos da aplicação na resposta HTTP.
  return response.status(500).json({ message: 'Erro interno do servidor.' });
}

module.exports = { errorHandler };
