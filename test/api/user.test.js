const request = require('supertest');
const app = require('../../src/app');
const database = require('../../src/database/db');

beforeAll(async () => {
    await database.db.sync({ force: true });
});

describe('User API', () => {
    let token;

    beforeEach(async () => {
        await request(app)
            .post('/api/user')
            .send({
                nome: 'Usuário Teste',
                email: 'teste@example.com',
                senha: 'senha123'
            });

        const loginResponse = await request(app)
            .post('/api/login')
            .send({
                email: 'teste@example.com',
                senha: 'senha123'
            });
        token = loginResponse.body.token;
    });

    test('Deve atualizar um usuário existente', async () => {
        const response = await request(app)
            .put('/api/user/1')
            .set('Authorization', `Bearer ${token}`)
            .send({
                nome: 'Novo Nome',
                email: 'novoemail@example.com',
                senha: 'novasenha123'
            });
            
        console.log(response.status, response.body)

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            nome: 'Novo Nome',
            email: 'novoemail@example.com'
    });
    })
    
    test('Deve deletar um usuário', async () => {
        const response = await request(app)
            .delete('/api/user/1')
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(204);
    });

    test('Deve listar todos os usuários', async () => {
        const response = await request(app)
            .get('/api/user')
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });
});
