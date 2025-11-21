const eventoModel = require('../models/eventoModel');

exports.listarTodos = async (req, res) => {
  try {
    const eventos = await eventoModel.findAll();
    res.json(eventos);
  } catch (err) { res.status(500).json({ message: "Erro." }); }
};

exports.buscarPorId = async (req, res) => {
  try {
    const evento = await eventoModel.findById(req.params.id);
    if (evento) res.json(evento);
    else res.status(404).json({ message: "Não encontrado" });
  } catch (err) { res.status(500).json({ message: "Erro." }); }
};

exports.criar = async (req, res) => {
  const { nome, data, localizacao, descricao, participantes } = req.body;
  const organizador_id = req.usuario.id;

  if (!nome || !data || !localizacao) return res.status(400).json({ message: 'Dados incompletos.' });

  try {
    const novo = await eventoModel.create({ nome, data, localizacao, descricao, participantes, organizador_id });
    res.status(201).json(novo);
  } catch (err) { res.status(500).json({ message: "Erro ao criar." }); }
};


exports.atualizar = async (req, res) => {
  const id = parseInt(req.params.id);
  const { nome, data, localizacao, descricao, participantes } = req.body;

  const usuarioId = req.usuario.id;
  const usuarioRole = req.usuario.role;

  try {
    const evento = await eventoModel.findById(id);
    if (!evento) return res.status(404).json({ message: 'Não encontrado.' });

    if (usuarioRole !== 'admin' && evento.organizador_id !== usuarioId) {
      return res.status(403).json({ message: 'Acesso negado.' });
    }

    const dados = {
      nome: nome || evento.nome,
      data: data || evento.data,
      localizacao: localizacao || evento.localizacao,
      descricao: descricao !== undefined ? descricao : evento.descricao,
      participantes: participantes !== undefined ? participantes : evento.participantes
    };

    await eventoModel.update(id, dados);
    res.json({ id, ...dados });

  } catch (err) { res.status(500).json({ message: "Erro." }); }
};

exports.deletar = async (req, res) => {
  const id = parseInt(req.params.id);
  const usuarioId = req.usuario.id;
  const usuarioRole = req.usuario.role;

  try {
    const evento = await eventoModel.findById(id);
    if (!evento) return res.status(404).json({ message: 'Não encontrado.' });

    if (usuarioRole !== 'admin' && evento.organizador_id !== usuarioId) {
      return res.status(403).json({ message: 'Acesso negado.' });
    }

    await eventoModel.delete(id);
    res.status(204).send();
  } catch (err) { res.status(500).json({ message: "Erro." }); }
};