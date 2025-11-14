// Força a inicialização do banco de dados ao carregar o app
require('./models/usuarioModel');
require('./models/eventoModel');

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const eventoRoutes = require('./routes/eventoRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');

app.use('/api/eventos', eventoRoutes);
app.use('/api/usuarios', usuarioRoutes);

app.get('/', (req, res) => {
  res.send('API de Gestão de Eventos "Jiromso" funcionando!');
});


-
  app.get('/api/health-check', (req, res) => {
    res.status(200).json({ status: 'ok' });
  });

module.exports = app;