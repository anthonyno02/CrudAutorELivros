# 🧙‍♂️ CRUD RPG - Gerenciamento de Personagens e Itens Mágicos

Este projeto é uma API feita em Node.js com Express que permite o gerenciamento de **Personagens** e **Itens Mágicos** de um RPG.

# 🚀 Como executar

# 1. Clone o repositório:
   (bash)
   git clone https://github.com/anthonyno02/CrudAutorELivros
   cd seu-repositorio
   
# 2. Instale as dependências:
npm install

# 4. Inicie o servidor:
node index.js

# 4. Acesse a aplicação:
 Servidor http://localhost:3000
 Documentação Swagger: http://localhost:3000/api-docs
 
# 📚 Documentação da API
A API está organizada em dois grupos principais: Personagens e Itens Mágicos.

# 🧝‍♂️ Personagens

| Método |          Rota                       |            Descrição                   |
|--------|-------------------------------------|----------------------------------------|
GET	   |    /personagens	                    |       Lista todos os personagens     
GET	   |    /personagens/:id	              |       Busca um personagem pelo ID
POST	   |   /personagens	                    |      Cria um novo personagem
PUT	   |    /personagens/:id	              |      Atualiza um personagem existente
DELETE	|    /personagens/:id	              |     Remove um personagem
POST	   |    /personagens/:id/atribuir-item	  |     Atribui um item a um personagem


# 🧪 Itens Mágicos

| Método |          Rota                       |            Descrição                   |
|--------|-------------------------------------|----------------------------------------|
GET	   |          /itens	                    |         Lista todos os itens mágicos
GET	   |         /itens/:id	                 |          Busca um item pelo ID
POST	   |         /itens	                    |          Cria um novo item mágico
PUT	   |         /itens/:id	                 |         Atualiza um item existente
DELETE	|        /itens/:id	                 |        Remove um item mágico


# 🛠 Tecnologias utilizadas
Node.js

Express

Swagger (para documentação)

# 📄 Licença
Este projeto é apenas para fins acadêmicos e não possui uma licença definida.
