const request = require('supertest');
const app = require('../src/app');
const eventoModel = require('../src/models/eventoModel');

jest.mock('../src/models/eventoModel');


describe('API Health Check', () => {
    it('GET /api/health-check - Deve retornar status 200 e { status: "ok" }', async () => {
        const response = await request(app)
            .get('/api/health-check')
            .expect(200);
        expect(response.body).toEqual({ status: 'ok' });
    });
});

describe('API de Eventos (com Mock)', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('GET /api/eventos - Deve retornar a lista de eventos do Model', async () => {

        const mockEventos = [
            { id: 1, nome: 'Evento Mock 1', data: '2025-01-01', localizacao: 'Mockville' },
            { id: 2, nome: 'Evento Mock 2', data: '2025-02-01', localizacao: 'Mocktown' }
        ];
        eventoModel.findAll.mockResolvedValue(mockEventos);

        const response = await request(app)
            .get('/api/eventos')
            .expect(200);

        expect(response.body).toEqual(mockEventos);
        expect(eventoModel.findAll).toHaveBeenCalledTimes(1);
    });

    it('POST /api/eventos - Deve falhar se não enviar um token (Rota Protegida)', async () => {

        const novoEvento = { nome: 'Evento Proibido', data: '2025-03-01', localizacao: 'Falha' };

        const response = await request(app)
            .post('/api/eventos')
            .send(novoEvento);

        expect([401, 403]).toContain(response.status);
        expect(eventoModel.create).not.toHaveBeenCalled();
    });
});