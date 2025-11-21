const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const usuarioModel = require('../models/usuarioModel');

const JWT_SECRET = 'seu-segredo-super-secreto';

exports.criarUsuario = async (req, res) => {
  const { nome, email, senha, role } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ message: "Preencha todos os campos." });
  }

  try {
    const usuarioExistente = await usuarioModel.findByEmail(email);
    if (usuarioExistente) return res.status(400).json({ message: "Email já existe." });

    const senhaCriptografada = bcrypt.hashSync(senha, 10);

    const novoUsuario = await usuarioModel.create({
      nome, email, senha: senhaCriptografada, role
    });

    res.status(201).json({ message: "Usuário criado!" });
  } catch (err) {
    res.status(500).json({ message: "Erro ao criar usuário." });
  }
};

exports.login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuario = await usuarioModel.findByEmail(email);
    if (!usuario) return res.status(401).json({ message: "Falha no login." });

    const senhaValida = bcrypt.compareSync(senha, usuario.senha);
    if (!senhaValida) return res.status(401).json({ message: "Falha no login." });

    const token = jwt.sign(
      { id: usuario.id, nome: usuario.nome, role: usuario.role },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: "Login OK!",
      token: token,
      role: usuario.role
    });

  } catch (err) {
    res.status(500).json({ message: "Erro no servidor." });
  }
};