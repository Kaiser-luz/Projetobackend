const sqlite3 = require('sqlite3').verbose();
const DBSOURCE = "jiromso.db";

const db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        console.error(err.message);
        throw err;
    } else {
        if (process.env.NODE_ENV !== 'test') {
            console.log('Conectado ao banco de dados SQLite.');
        }

        db.run(`CREATE TABLE IF NOT EXISTS eventos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            data TEXT NOT NULL,
            localizacao TEXT NOT NULL,
            descricao TEXT
        )`, (err) => {
            if (err) {
                console.error("Erro ao criar tabela 'eventos':", err.message);
            }
        });

        db.run(`CREATE TABLE IF NOT EXISTS usuarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            senha TEXT NOT NULL
        )`, (err) => {
            if (err) {
                console.error("Erro ao criar tabela 'usuarios':", err.message);
            }
        });
    }
});

module.exports = db;