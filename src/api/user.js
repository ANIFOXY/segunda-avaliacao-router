const UserController = require('../controller/user')

class UserApi {
    async createUser(req, res) {
        const { nome, email, senha } = req.body

        try {
            const user = await UserController.createUser(nome, email, senha)
            console.log("criado com sucesso")
            return res.status(201).send(user)
        } catch (e) {
            return res.status(400).send({ error: `Erro ao criar usuário ${e.message}`})
        }
    }

    async updateUser(req, res) {
        const { id } = req.params
        const { nome, email, senha } = req.body

        try {
            const user = await UserController.update(Number(id), nome, email, senha)
            return res.status(200).send(user)
        } catch (e) {
            return res.status(400).send({ error: `Erro ao alterar usuário ${e.message}`})
        }
    }

    async deleteUser(req, res) {
        const { id } = req.params

        try {
            await UserController.delete(Number(id))
            return res.status(204).send()
        } catch (e) {
            return res.status(400).send({ error: `Erro ao deletar usuário ${e.message}`})
        }
    }
    // ListUsers
    async findUsers(req, res) {
        try {
            const users = await UserController.find()
            return res.status(200).send(users)
        } catch (e) {
            return res.status(400).send({ error: `Erro ao listar usuário ${e.message}`})
        }
    }

    async login(req, res) {
        const { email, senha } = req.body

        if (!email || !senha) {
            return res.status(400).send({ error: 'Email e senha sao obrigatorios' })
        }

        try {
            const token = await UserController.login(email, senha)

            res.status(200).send({ token })
        } catch (e) {
            res.status(400).send({ error: `Erro ao fazer login: ${e.message}`})
        }
    }

    async validateToken(req, res, next) {
        const token = req.headers.authorization

        try {
            await UserController.validateToken(token)
            next()
        } catch (e) {
            res.status(400).send({ error: `Erro na validação do token: ${e.message}`})
        }
    }
}

module.exports = new UserApi()