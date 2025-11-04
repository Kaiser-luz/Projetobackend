const db = require('../../database.js'); // Importa a conexão do banco

const eventoModel = {
    // Método para buscar todos os eventos
    findAll: () => {
        return new Promise((resolve, reject) => {
            db.all("SELECT * FROM eventos", [], (err, rows) => {
                if (err) reject(err);
                resolve(rows);
            });
        });
    },

    // Método para buscar um evento por ID
    findById: (id) => {
        return new Promise((resolve, reject) => {
            db.get("SELECT * FROM eventos WHERE id = ?", [id], (err, row) => {
                if (err) reject(err);
                resolve(row);
            });
        });
    },

    // Método para criar um novo evento
    create: (evento) => {
        const { nome, data, localizacao, descricao } = evento;
        return new Promise((resolve, reject) => {
            db.run("INSERT INTO eventos (nome, data, localizacao, descricao) VALUES (?, ?, ?, ?)",
                   [nome, data, localizacao, descricao], function (err) {
                if (err) reject(err);
                resolve({ id: this.lastID, ...evento });
            });
        });
    },

    // Método para atualizar um evento
    update: (id, evento) => {
        const { nome, data, localizacao, descricao } = evento;
        return new Promise((resolve, reject) => {
            db.run(`UPDATE eventos 
                       SET nome = ?, data = ?, localizacao = ?, descricao = ?
                     WHERE id = ?`,
                     [nome, data, localizacao, descricao, id], function (err) {
                if (err) reject(err);
                resolve({ changes: this.changes });
            });
        });
    },

    // Método para deletar um evento
    delete: (id) => {
        return new Promise((resolve, reject) => {
            db.run("DELETE FROM eventos WHERE id = ?", [id], function (err) {
                if (err) reject(err);
                resolve({ changes: this.changes });
            });
        });
    }
};

module.exports = eventoModel;