const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// IMPORTANTE: Em um projeto real, este segredo deve vir de um arquivo .env!
const JWT_SECRET = 'seu-segredo-super-secreto-e-dificil-de-adivinhar';

// Nosso "banco de dados" de usuários em memória
let usuarios = [];
let nextUserId = 1;

// Função para CRIAR um novo usuário (Cadastro)
exports.criarUsuario = (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ message: "Nome, email e senha são obrigatórios."});
  }
  if (usuarios.find(u => u.email === email)) {
    return res.status(400).json({ message: "Email já cadastrado." });
  }

  // Criptografa a senha ANTES de salvar (10 é o custo do hash)
  const senhaCriptografada = bcrypt.hashSync(senha, 10);

  const novoUsuario = {
    id: nextUserId++,
    nome,
    email,
    senha: senhaCriptografada
  };
  usuarios.push(novoUsuario);

  // Nunca retorne a senha na resposta!
  const { senha: _, ...usuarioSemSenha } = novoUsuario;
  res.status(201).json(usuarioSemSenha);
};

// Função de LOGIN
exports.login = (req, res) => {
  const { email, senha } = req.body;

  const usuario = usuarios.find(u => u.email === email);
  if (!usuario) {
    return res.status(401).json({ message: "Credenciais inválidas." });
  }

  const senhaValida = bcrypt.compareSync(senha, usuario.senha);
  if (!senhaValida) {
    return res.status(401).json({ message: "Credenciais inválidas." });
  }

  // Se as credenciais são válidas, gera o Token JWT
  const token = jwt.sign(
    { id: usuario.id, nome: usuario.nome }, // Payload: dados que queremos guardar no token
    JWT_SECRET,
    { expiresIn: '1h' } // Token expira em 1 hora
  );

  res.status(200).json({
    message: "Login bem-sucedido!",
    token: token
  });
};