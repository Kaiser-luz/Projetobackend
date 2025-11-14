// Importa o app configurado do app.js
const app = require('./src/app');

const PORTA = 3000;

// Inicia o servidor
app.listen(PORTA, () => {
    console.log(`Servidor rodando em http://localhost:${PORTA}`);
});