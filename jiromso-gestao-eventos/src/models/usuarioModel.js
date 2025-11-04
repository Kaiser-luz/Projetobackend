const db = require('../../database.js');

const usuarioModel = {
    // Método para criar um novo usuário
    create: (usuario) => {
        const { nome, email, senha } = usuario;
        return new Promise((resolve, reject) => {
            db.run("INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)",
                [nome, email, senha], function (err) {
                    if (err) reject(err);
                    resolve({ id: this.lastID, nome, email });
                });
        });
    },

    // Método para buscar um usuário por email (para login e verificação)
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