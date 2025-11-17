const path = require('path');

require('./models/usuarioModel'); 
require('./models/eventoModel'); 

const express = require('express');
const cors = require('cors');
const app = express();


app.use(cors());

const publicPath = path.join(__dirname, '..', 'public');
app.use(express.static(publicPath));

app.use(express.json());


const eventoRoutes = require('./routes/eventoRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');

app.use('/api/eventos', eventoRoutes);
app.use('/api/usuarios', usuarioRoutes);


app.get('/api/health-check', (req, res) => {
    res.status(200).json({ status: 'ok' });
});


/*app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});*/

module.exports = app;