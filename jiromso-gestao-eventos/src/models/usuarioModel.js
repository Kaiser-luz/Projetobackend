const db = require('../../database.js');

const usuarioModel = {
    create: (usuario) => {
        const { nome, email, senha, role } = usuario;
        return new Promise((resolve, reject) => {
            db.run("INSERT INTO usuarios (nome, email, senha, role) VALUES (?, ?, ?, ?)",
                [nome, email, senha, role || 'user'], function (err) {
                    if (err) reject(err);
                    resolve({ id: this.lastID, nome, email, role });
                });
        });
    },

    findByEmail: (email) => {
        return new Promise((resolve, reject) => {
            db.get("SELECT * FROM usuarios WHERE email = ?", [email], (err, row) => {
                if (err) reject(err);
                resolve(row);
            });
        });
    }
};

module.exports = usuarioModel;