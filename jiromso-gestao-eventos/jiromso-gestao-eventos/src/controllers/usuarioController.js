const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const usuarioModel = require('../models/usuarioModel');

// O segredo deve estar em um .env, mas por enquanto:
const JWT_SECRET = 'seu-segredo-super-secreto-e-dificil-de-adivinhar';

// Função para CRIAR um novo usuário (Cadastro)
exports.criarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ message: "Nome, email e senha são obrigatórios." });
  }

  try {
    // Verifica se o email já existe no banco
    const usuarioExistente = await usuarioModel.findByEmail(email);
    if (usuarioExistente) {
      return res.status(400).json({ message: "Email já cadastrado." });
    }

    // Criptografa a senha
    const senhaCriptografada = bcrypt.hashSync(senha, 10);

    // Salva no banco
    const novoUsuario = await usuarioModel.create({
      nome,
      email,
      senha: senhaCriptografada
    });

    // Não retornamos a senha na resposta
    const { senha: _, ...usuarioSemSenha } = novoUsuario;
    res.status(201).json(usuarioSemSenha);

  } catch (err) {
    res.status(500).json({ message: "Erro no servidor ao criar usuário." });
  }
};

// Função de LOGIN
exports.login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    // 1. Encontrar o usuário pelo email no banco
    const usuario = await usuarioModel.findByEmail(email);
    if (!usuario) {
      return res.status(401).json({ message: "Credenciais inválidas." });
    }

    // 2. Comparar a senha enviada com a senha criptografada no banco
    const senhaValida = bcrypt.compareSync(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(401).json({ message: "Credenciais inválidas." });
    }

    // 3. Gerar o Token JWT
    const token = jwt.sign(
      { id: usuario.id, nome: usuario.nome }, // Payload
      JWT_SECRET,
      { expiresIn: '1h' } // Expira em 1 hora
    );

    // 4. Enviar o token
    res.status(200).json({
      message: "Login bem-sucedido!",
      token: token
    });

  } catch (err) {
    res.status(500).json({ message: "Erro no servidor ao fazer login." });
  }
};