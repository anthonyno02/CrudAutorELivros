const express = require('express');
const router = express.Router();

let itens = [];
let proximoId = 1;

/**
 * @swagger
 * tags:
 *   name: Itens
 *   description: Rotas para gerenciamento de itens mágicos
 */

/**
 * @swagger
 * /itens:
 *   get:
 *     summary: Retorna todos os itens mágicos
 *     tags: [Itens]
 *     responses:
 *       200:
 *         description: Lista de itens mágicos
 */
router.get('/', (req, res) => {
  res.json(itens);
});

/**
 * @swagger
 * /itens/{id}:
 *   get:
 *     summary: Retorna um item mágico pelo ID
 *     tags: [Itens]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Item encontrado
 *       404:
 *         description: Item não encontrado
 */
router.get('/:id', (req, res) => {
  const item = itens.find(i => i.id === parseInt(req.params.id));
  if (!item) {
    return res.status(404).json({ mensagem: 'Item não encontrado.' });
  }
  res.json(item);
});

/**
 * @swagger
 * /itens:
 *   post:
 *     summary: Cria um novo item mágico
 *     tags: [Itens]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               poder:
 *                 type: integer
 *             required:
 *               - nome
 *               - poder
 *     responses:
 *       201:
 *         description: Item criado com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post('/', (req, res) => {
  const { nome, poder } = req.body;

  if (!nome || poder == null) {
    return res.status(400).json({ mensagem: 'Nome e poder são obrigatórios.' });
  }

  const novoItem = {
    id: proximoId++,
    nome,
    poder
  };

  itens.push(novoItem);
  res.status(201).json(novoItem);
});

/**
 * @swagger
 * /itens/{id}:
 *   put:
 *     summary: Atualiza um item mágico pelo ID
 *     tags: [Itens]
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
 *               poder:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Item atualizado com sucesso
 *       404:
 *         description: Item não encontrado
 */
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nome, poder } = req.body;

  const item = itens.find(i => i.id === parseInt(id));
  if (!item) {
    return res.status(404).json({ mensagem: 'Item não encontrado.' });
  }

  if (nome !== undefined) item.nome = nome;
  if (poder !== undefined) item.poder = poder;

  res.json(item);
});

/**
 * @swagger
 * /itens/{id}:
 *   delete:
 *     summary: Remove um item mágico pelo ID
 *     tags: [Itens]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Item removido com sucesso
 *       404:
 *         description: Item não encontrado
 */
router.delete('/:id', (req, res) => {
  const index = itens.findIndex(i => i.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ mensagem: 'Item não encontrado.' });
  }

  itens.splice(index, 1);
  res.json({ mensagem: 'Item removido com sucesso.' });
});

module.exports = router;
module.exports.itens = itens; // exporta array para usar em personagens
module.exports.setItensRef = (ref) => { itens = ref; }; // permite sincronizar em outro lugar
