import express from 'express';

const app = express();

// GET = Obter informações
// POST = Criar uma informação
// PUT = Atualizar um informação já existente
// DELETE = Deletar uma informação já existente

app.get('/users', (request, response) => {
  const dbArray = ['Alexandre', 'Diego', 'Maria', 'Ana'];

  response.json(dbArray);
});

app.listen(8080);
console.log('server is running on port 8080');
