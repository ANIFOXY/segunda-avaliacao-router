const request = require('supertest');
const app = require('../../src/app');

describe('User API', () => {

    let token;

    beforeAll(async () => {
        console.info('Iniciando TDD com jest')
    });

    afterAll(() =>{
        console.info('Encerrados os testes')
    });

    it('Post /api/v1/user (isso deve criar um usuario)', async () =>{
        const response = await request(app)
            .post('/api/v1/user')
            .send({
                nome:"joao",
                email:"joao@gmail.com",
                senha:"12345678"
            });

            console.log(response.body)
            expect(response.statusCode).toBe(201)
            expect(response.body).toHaveProperty("id")
            expect(response.body.nome).toBe("joao")
            expect(response.body.email).toBe("joao@gmail.com")
    })

    it('POST /api/v1/login (Isso é para fazer o login', async () => {
        const response = await request(app)
            .post('/api/v1/login')
            .send({
                email:"joao@gmail.com",
                senha:"12345678"
            });
            console.log(response.body);
            token = response.body.token;
            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty("token");
    });

    it('Delete /api/v1/user/:id (Isso deve deletar o user)', async () => {
        const userToDelete = await request(app)
            .post('/api/v1/user')
            .send({
                nome:"joao",
                email:"joao@gmail.com",
                senha:"12345678"
            });
        const response = await request(app)
            .delete(`/api/v1/user/${userToDelete.body.id}`)
            .set('Authorization', `Bearer ${token}`)
    })

    it('Get /api/v1/user (Isso deve listar todos os usuario)', async () => {
        const response = await request(app)
            .get('/api/v1/user')
            .set('Authorization', `Bearer ${token}`);

        console.log(response.body);
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });
})
       //