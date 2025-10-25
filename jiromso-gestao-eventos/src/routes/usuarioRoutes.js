const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// Rota para criar um novo usuário (Cadastro)
// POST /api/usuarios
router.post('/', usuarioController.criarUsuario);

// Rota para autenticar um usuário (Login)
// POST /api/usuarios/login
router.post('/login', usuarioController.login);

module.exports = router;