const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'CRUD RPG - Personagens e Itens Mágicos',
      version: '1.0.0',
      description: 'API para gerenciamento de personagens e itens mágicos',
    },
  },
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
