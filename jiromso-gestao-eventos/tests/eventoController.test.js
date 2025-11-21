const eventoController = require('../src/controllers/eventoController');
const eventoModel = require('../src/models/eventoModel');

// Mocka o Model
jest.mock('../src/models/eventoModel');

describe('EventoController - Testes Unitários', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('deve retornar todos os eventos e status 200 (listarTodos)', async () => {

        // --- Arrange ---
        const mockEventos = [{ id: 1, nome: 'Mock 1' }];
        eventoModel.findAll.mockResolvedValue(mockEventos);

        // Mocks do req e res
        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(), // Permite encadeamento .status().json()
            json: jest.fn()
        };

        // --- Act ---
        await eventoController.listarTodos(req, res);

        // --- Assert ---
        expect(eventoModel.findAll).toHaveBeenCalledTimes(1); // Verificamos se o Model foi chamado
        expect(res.json).toHaveBeenCalledWith(mockEventos); // Verificamos se a resposta está correta
    });

    it('deve criar um evento e retornar status 201 (criar)', async () => {

        // --- Arrange ---
        const mockNovoEvento = { nome: 'Novo Evento', data: '2025-04-01', localizacao: 'Aqui' };
        const mockEventoCriado = { id: 1, ...mockNovoEvento };
        eventoModel.create.mockResolvedValue(mockEventoCriado);

        const req = {
            body: mockNovoEvento,
            usuario: { id: 1, role: 'admin' }
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        // --- Act ---
        await eventoController.criar(req, res);

        // --- Assert ---
        expect(eventoModel.create).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(mockEventoCriado);
    });

});