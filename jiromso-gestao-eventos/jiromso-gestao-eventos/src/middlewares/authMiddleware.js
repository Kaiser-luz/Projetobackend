const jwt = require('jsonwebtoken');
const JWT_SECRET = 'seu-segredo-super-secreto-e-dificil-de-adivinhar';

exports.verificaToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Formato "Bearer TOKEN"

  if (!token) {
    return res.status(401).json({ message: "Acesso negado. Nenhum token fornecido." });
  }

  try {
    // Verifica se o token é válido usando o segredo
    const decoded = jwt.verify(token, JWT_SECRET);
    // Adiciona os dados do usuário (payload) ao objeto `req` para uso futuro
    req.usuario = decoded;
    next(); // Permite que a requisição continue para o controller
  } catch (error) {
    res.status(403).json({ message: "Token inválido ou expirado." });
  }
};