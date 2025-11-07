require('./models/usuarioModel'); // Garante que o model (e o db) seja inicializado
require('./models/eventoModel'); // Garante que o model (e o db) seja inicializado

const express = require('express');
const cors = require('cors'); // Não se esqueça do CORS para o front-end
const app = express();
const PORTA = 3000;

app.use(cors());
app.use(express.json());

// Importando as rotas
const eventoRoutes = require('./routes/eventoRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');

// Registrando as rotas
app.use('/api/eventos', eventoRoutes);
app.use('/api/usuarios', usuarioRoutes);

app.get('/', (req, res) => {
  res.send('API de Gestão de Eventos "Jiromso" funcionando!');
});

app.listen(PORTA, () => {
  console.log(`Servidor rodando em http://localhost:${PORTA}`);
});