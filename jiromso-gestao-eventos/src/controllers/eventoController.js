// Nosso "banco de dados" em memória.
// Em uma aplicação real, isso viria de um banco de dados como SQL ou MongoDB.
let eventos = [
  { id: 1, nome: 'Lançamento de Produto Tech', data: '2025-11-20', localizacao: 'Centro de Convenções', descricao: 'Apresentação do novo gadget da nossa marca.' },
  { id: 2, nome: 'Conferência Anual de Desenvolvedores', data: '2026-01-15', localizacao: 'Teatro Principal', descricao: 'Palestras e workshops sobre as novas tecnologias.' },
  { id: 3, nome: 'Workshop de Marketing Digital', data: '2025-12-05', localizacao: 'Coworking Central', descricao: 'Aprenda as melhores estratégias de marketing.' }
];
let nextId = 4;

// LISTAR TODOS os eventos (GET)
exports.listarTodos = (req, res) => {
  res.json(eventos);
};

// BUSCAR UM evento por ID (GET)
exports.buscarPorId = (req, res) => {
  const idEvento = parseInt(req.params.id);
  const eventoEncontrado = eventos.find(e => e.id === idEvento);
  if (eventoEncontrado) {
    res.json(eventoEncontrado);
  } else {
    res.status(404).json({ message: 'Evento não encontrado.' });
  }
};

// CRIAR um novo evento (POST)
exports.criar = (req, res) => {
  const { nome, data, localizacao, descricao } = req.body;
  if (!nome || !data || !localizacao) {
    return res.status(400).json({ message: 'Nome, data e localização são obrigatórios.' });
  }
  const novoEvento = { id: nextId++, nome, data, localizacao, descricao: descricao || '' };
  eventos.push(novoEvento);
  res.status(201).json(novoEvento);
};

// ATUALIZAR um evento existente (PUT)
exports.atualizar = (req, res) => {
  const id = parseInt(req.params.id);
  const eventoIndex = eventos.findIndex(e => e.id === id);
  if (eventoIndex !== -1) {
    const { nome, data, localizacao, descricao } = req.body;
    eventos[eventoIndex] = { 
        ...eventos[eventoIndex], 
        nome: nome || eventos[eventoIndex].nome, 
        data: data || eventos[eventoIndex].data,
        localizacao: localizacao || eventos[eventoIndex].localizacao,
        descricao: descricao !== undefined ? descricao : eventos[eventoIndex].descricao
    };
    res.json(eventos[eventoIndex]);
  } else {
    res.status(404).json({ message: 'Evento não encontrado para atualização.' });
  }
};

// DELETAR um evento (DELETE)
exports.deletar = (req, res) => {
  const id = parseInt(req.params.id);
  const initialLength = eventos.length;
  eventos = eventos.filter(e => e.id !== id);
  if (eventos.length < initialLength) {
    res.status(204).send(); // 204 No Content
  } else {
    res.status(404).json({ message: 'Evento não encontrado para exclusão.' });
  }
};