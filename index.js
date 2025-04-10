const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger/swaggerConfig');

const personagemRoutes = require('./routes/personagemRoutes');
const itemRoutes = require('./routes/itemRoutes');

app.use(express.json());

// Rotas
app.use('/personagens', personagemRoutes);
app.use('/itens', itemRoutes);

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Inicia o servidor
const PORT = 3000;

app.use((req, res) => {
    res.status(404).json({ mensagem: 'Rota não encontrada.' });
  });
  
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
