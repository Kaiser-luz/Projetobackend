const eventoModel = require('../models/eventoModel');

// LISTAR TODOS (GET)
exports.listarTodos = async (req, res) => {
  try {
    const eventos = await eventoModel.findAll();
    res.json(eventos);
  } catch (err) {
    res.status(500).json({ message: "Erro no servidor ao buscar eventos." });
  }
};

// BUSCAR POR ID (GET)
exports.buscarPorId = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const evento = await eventoModel.findById(id);
    if (evento) {
      res.json(evento);
    } else {
      res.status(404).json({ message: 'Evento não encontrado.' });
    }
  } catch (err) {
    res.status(500).json({ message: "Erro no servidor." });
  }
};

// CRIAR (POST)
exports.criar = async (req, res) => {
  const { nome, data, localizacao, descricao } = req.body;
  if (!nome || !data || !localizacao) {
    return res.status(400).json({ message: 'Nome, data e localização são obrigatórios.' });
  }

  try {
    const novoEvento = await eventoModel.create({ nome, data, localizacao, descricao });
    res.status(201).json(novoEvento);
  } catch (err) {
    res.status(500).json({ message: "Erro no servidor ao criar evento." });
  }
};

// ATUALIZAR (PUT)
exports.atualizar = async (req, res) => {
  const id = parseInt(req.params.id);
  const { nome, data, localizacao, descricao } = req.body;

  // Lógica para buscar o evento atual e mesclar os dados
  try {
    const eventoAtual = await eventoModel.findById(id);
    if (!eventoAtual) {
      return res.status(404).json({ message: 'Evento não encontrado para atualização.' });
    }

    // Mescla dados: usa o novo valor se fornecido, senão mantém o antigo
    const dadosAtualizados = {
      nome: nome || eventoAtual.nome,
      data: data || eventoAtual.data,
      localizacao: localizacao || eventoAtual.localizacao,
      descricao: descricao !== undefined ? descricao : eventoAtual.descricao
    };

    const result = await eventoModel.update(id, dadosAtualizados);
    if (result.changes > 0) {
      res.json({ id, ...dadosAtualizados });
    } else {
      res.status(404).json({ message: 'Evento não encontrado para atualização.' });
    }
  } catch (err) {
    res.status(500).json({ message: "Erro no servidor ao atualizar evento." });
  }
};

// DELETAR (DELETE)
exports.deletar = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const result = await eventoModel.delete(id);
    if (result.changes > 0) {
      res.status(204).send(); // Sucesso, sem conteúdo
    } else {
      res.status(404).json({ message: 'Evento não encontrado para exclusão.' });
    }
  } catch (err) {
    res.status(500).json({ message: "Erro no servidor ao deletar evento." });
  }
};