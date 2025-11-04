const express = require('express');
const router = express.Router();
const eventoController = require('../controllers/eventoController');

// Importamos nosso guardião
const { verificaToken } = require('../middlewares/authMiddleware');

// --- ROTAS PÚBLICAS ---
router.get('/', eventoController.listarTodos);
router.get('/:id', eventoController.buscarPorId);

// --- ROTAS PROTEGIDAS ---
// O middleware `verificaToken` é executado ANTES das funções do controller
router.post('/', verificaToken, eventoController.criar);
router.put('/:id', verificaToken, eventoController.atualizar);
router.delete('/:id', verificaToken, eventoController.deletar);

module.exports = router;