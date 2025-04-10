const express = require('express');
const router = express.Router();
const { itens } = require('./itemRoutes');

let personagens = [];
let proximoId = 1;

/**
 * @swagger
 * tags:
 *   name: Personagens
 *   description: Rotas para gerenciamento de personagens
 */

/**
 * @swagger
 * /personagens:
 *   get:
 *     summary: Retorna todos os personagens
 *     tags: [Personagens]
 *     responses:
 *       200:
 *         description: Lista de personagens
 */
router.get('/', (req, res) => {
  res.json(personagens);
});

/**
 * @swagger
 * /personagens/{id}:
 *   get:
 *     summary: Retorna um personagem pelo ID
 *     tags: [Personagens]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Personagem encontrado
 *       404:
 *         description: Personagem não encontrado
 */
router.get('/:id', (req, res) => {
  const personagem = personagens.find(p => p.id === parseInt(req.params.id));
  if (!personagem) {
    return res.status(404).json({ mensagem: 'Personagem não encontrado.' });
  }
  res.json(personagem);
});

/**
 * @swagger
 * /personagens:
 *   post:
 *     summary: Cria um novo personagem
 *     tags: [Personagens]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               classe:
 *                 type: string
 *               nivel:
 *                 type: integer
 *             required:
 *               - nome
 *               - classe
 *               - nivel
 *     responses:
 *       201:
 *         description: Personagem criado com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post('/', (req, res) => {
  const { nome, classe, nivel } = req.body;

  if (!nome || !classe || nivel == null) {
    return res.status(400).json({ mensagem: 'Nome, classe e nível são obrigatórios.' });
  }

  const novoPersonagem = {
    id: proximoId++,
    nome,
    classe,
    nivel,
    itens: [],
  };

  personagens.push(novoPersonagem);
  res.status(201).json(novoPersonagem);
});

/**
 * @swagger
 * /personagens/{id}:
 *   put:
 *     summary: Atualiza um personagem pelo ID
 *     tags: [Personagens]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               classe:
 *                 type: string
 *               nivel:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Personagem atualizado com sucesso
 *       404:
 *         description: Personagem não encontrado
 */
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nome, classe, nivel } = req.body;

  const personagem = personagens.find(p => p.id === parseInt(id));
  if (!personagem) {
    return res.status(404).json({ mensagem: 'Personagem não encontrado.' });
  }

  if (nome !== undefined) personagem.nome = nome;
  if (classe !== undefined) personagem.classe = classe;
  if (nivel !== undefined) personagem.nivel = nivel;

  res.json(personagem);
});

/**
 * @swagger
 * /personagens/{id}:
 *   delete:
 *     summary: Remove um personagem pelo ID
 *     tags: [Personagens]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Personagem removido com sucesso
 *       404:
 *         description: Personagem não encontrado
 */
router.delete('/:id', (req, res) => {
  const index = personagens.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ mensagem: 'Personagem não encontrado.' });
  }

  personagens.splice(index, 1);
  res.json({ mensagem: 'Personagem removido com sucesso.' });
});

/**
 * @swagger
 * /personagens/{id}/atribuir-item:
 *   post:
 *     summary: Atribui um item mágico a um personagem
 *     tags: [Personagens]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               itemId:
 *                 type: integer
 *             required:
 *               - itemId
 *     responses:
 *       200:
 *         description: Item atribuído com sucesso
 *       404:
 *         description: Personagem ou item não encontrado
 */
router.post('/:id/atribuir-item', (req, res) => {
  const { id } = req.params;
  const { itemId } = req.body;

  const personagem = personagens.find(p => p.id === parseInt(id));
  if (!personagem) {
    return res.status(404).json({ mensagem: 'Personagem não encontrado.' });
  }

  const item = itens.find(i => i.id === itemId);
  if (!item) {
    return res.status(404).json({ mensagem: 'Item não encontrado.' });
  }

  personagem.itens.push(item);
  res.json({ mensagem: 'Item atribuído com sucesso.', personagem });
});

/**
 * @swagger
 * /personagens/{id}/itens:
 *   get:
 *     summary: Lista todos os itens mágicos de um personagem
 *     tags: [Personagens]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de itens mágicos do personagem
 *       404:
 *         description: Personagem não encontrado
 */
router.get('/:id/itens', (req, res) => {
  const personagem = personagens.find(p => p.id === parseInt(req.params.id));
  if (!personagem) {
    return res.status(404).json({ mensagem: 'Personagem não encontrado.' });
  }

  res.json(personagem.itens);
});

/**
 * @swagger
 * /personagens/{id}/remover-item:
 *   post:
 *     summary: Remove um item mágico do personagem
 *     tags: [Personagens]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               itemId:
 *                 type: integer
 *             required:
 *               - itemId
 *     responses:
 *       200:
 *         description: Item removido com sucesso
 *       404:
 *         description: Personagem ou item não encontrado
 */
router.post('/:id/remover-item', (req, res) => {
  const { id } = req.params;
  const { itemId } = req.body;

  const personagem = personagens.find(p => p.id === parseInt(id));
  if (!personagem) {
    return res.status(404).json({ mensagem: 'Personagem não encontrado.' });
  }

  const indexItem = personagem.itens.findIndex(i => i.id === itemId);
  if (indexItem === -1) {
    return res.status(404).json({ mensagem: 'Item não encontrado no personagem.' });
  }

  personagem.itens.splice(indexItem, 1);
  res.json({ mensagem: 'Item removido com sucesso.', personagem });
});

/**
 * @swagger
 * /personagens/{id}/amuleto:
 *   get:
 *     summary: Busca o primeiro amuleto do personagem
 *     tags: [Personagens]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Amuleto encontrado
 *       404:
 *         description: Personagem ou amuleto não encontrado
 */
router.get('/:id/amuleto', (req, res) => {
  const personagem = personagens.find(p => p.id === parseInt(req.params.id));
  if (!personagem) {
    return res.status(404).json({ mensagem: 'Personagem não encontrado.' });
  }

  const amuleto = personagem.itens.find(i => i.tipo === 'amuleto');
  if (!amuleto) {
    return res.status(404).json({ mensagem: 'Amuleto não encontrado para este personagem.' });
  }

  res.json(amuleto);
});

module.exports = router;
