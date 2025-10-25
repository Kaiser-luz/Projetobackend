const express = require('express');
const router = express.Router();
const eventoController = require('../controllers/eventoController');

// Importamos nosso guardião (middleware de autenticação)
const { verificaToken } = require('../middlewares/authMiddleware');

// --- ROTAS PÚBLICAS (qualquer um pode acessar) ---
// GET /api/eventos -> Lista todos os eventos
router.get('/', eventoController.listarTodos);

// GET /api/eventos/:id -> Busca um evento específico
router.get('/:id', eventoController.buscarPorId);


// --- ROTAS PROTEGIDAS (apenas usuários autenticados) ---
// O middleware `verificaToken` é executado ANTES das funções do controller

// POST /api/eventos -> Cria um novo evento
router.post('/', verificaToken, eventoController.criar);

// PUT /api/eventos/:id -> Atualiza um evento existente
router.put('/:id', verificaToken, eventoController.atualizar);

// DELETE /api/eventos/:id -> Deleta um evento
router.delete('/:id', verificaToken, eventoController.deletar);

module.exports = router;