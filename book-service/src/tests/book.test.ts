import request from 'supertest';
import { prismaMock } from '../lib/__mocks__/prisma';
import app from '../app';

jest.mock('../lib/prisma', () => ({
    prisma: prismaMock,
}));

describe('Books Service - Unit Tests', () => {

    beforeEach(() => {
        // Reiniciamos el mock antes de cada test
        jest.clearAllMocks();
    });

    it('Must return a book by ID', async () => {
        // 1. Configuramos "Mock Data"
        const mockBook = {
            id: 1,
            title: 'The Clean Coder',
            author: 'Uncle Bob',
            price: 35.0,
            userId: 10,
            createdAt: new Date(),
            updatedAt: new Date(),
            isbn: '1234567890',
        };

        // 2. Programamos el Mock: "Cuando alguien llame a findUnique, devuelve mockBook"
        prismaMock.book.findUnique.mockResolvedValue(mockBook);

        // 3. Ejecutamos la petición
        const response = await request(app).get('/books/1');

        // 4. Verificamos resultados
        expect(response.status).toBe(200);
        expect(response.body.title).toBe('The Clean Coder');
        expect(prismaMock.book.findUnique).toHaveBeenCalledWith({
            where: { id: 1 }
        });
    });
});