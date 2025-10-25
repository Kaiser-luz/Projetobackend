const express = require('express');
const app = express();
const PORTA = 3000;

// Middleware para permitir que o Express interprete o corpo das requisições como JSON
app.use(express.json());

// Importando as rotas
const eventoRoutes = require('./routes/eventoRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');

// Definindo um prefixo para as rotas
// Todas as rotas em 'eventoRoutes' começarão com '/api/eventos'
app.use('/api/eventos', eventoRoutes);
// Todas as rotas em 'usuarioRoutes' começarão com '/api/usuarios'
app.use('/api/usuarios', usuarioRoutes);

// Rota principal de teste
app.get('/', (req, res) => {
  res.send('API de Gestão de Eventos "Jiromso" funcionando!');
});

// Inicialização do servidor
app.listen(PORTA, () => {
  console.log(`Servidor rodando em http://localhost:${PORTA}`);
  console.log('Para parar o servidor, pressione Ctrl+C no terminal.');
});