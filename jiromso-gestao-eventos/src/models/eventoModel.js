const db = require('../../database.js');

const eventoModel = {
    findAll: () => {
        return new Promise((resolve, reject) => {
            db.all("SELECT * FROM eventos", [], (err, rows) => {
                if (err) reject(err);
                resolve(rows);
            });
        });
    },

    findById: (id) => {
        return new Promise((resolve, reject) => {
            db.get("SELECT * FROM eventos WHERE id = ?", [id], (err, row) => {
                if (err) reject(err);
                resolve(row);
            });
        });
    },

    create: (evento) => {
        const { nome, data, localizacao, descricao, participantes, organizador_id } = evento;
        return new Promise((resolve, reject) => {
            db.run(
                "INSERT INTO eventos (nome, data, localizacao, descricao, participantes, organizador_id) VALUES (?, ?, ?, ?, ?, ?)",
                [nome, data, localizacao, descricao, participantes, organizador_id],
                function (err) {
                    if (err) reject(err);
                    resolve({ id: this.lastID, ...evento });
                }
            );
        });
    },

    update: (id, evento) => {
        const { nome, data, localizacao, descricao, participantes } = evento;
        return new Promise((resolve, reject) => {
            db.run(
                `UPDATE eventos 
                 SET nome = ?, data = ?, localizacao = ?, descricao = ?, participantes = ?
                 WHERE id = ?`,
                [nome, data, localizacao, descricao, participantes, id],
                function (err) {
                    if (err) reject(err);
                    resolve({ changes: this.changes });
                }
            );
        });
    },

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