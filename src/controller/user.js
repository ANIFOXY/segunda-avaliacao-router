const user = require('../model/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const SECRET_KEY = 'terceiraavaliacao'
const SALT_VALUE = 10

// Faz a criação de um novo usuario e traz um erro caso tenha campos vazios
class UserController {
    async createUser(nome, email, senha) {
        if (!nome || !email || !senha) {
            throw new Error('Nome, email e senha são obrigatórios.')
        }

        // Verifica se o email ja existe
        const emailExiste = await user.findOne({ where: { email } });
        if (emailExiste) {
            throw new Error('Email já está em uso.');
        }

        const cypherSenha = await bcrypt.hash(senha, SALT_VALUE)

        const userValue = await user.create({
            nome,
            email,
            senha: cypherSenha
        })
        console.log('Sucesso', 'Usuario criado com sucesso');

        return userValue
    }

    async findUser(id) {
        if (!id) {
            throw new Error('Id é obrigatório.')
        }

        const userValue = await user.findByPk(id)
        
        if (!userValue) {
            throw new Error('Usuário não encontrado.')
        }

        return userValue
    }

    async update(id, nome, email, senha) {
        if (!id || !nome || !email || !senha) {
            throw new Error('Id, Nome, email e senha são obrigatórios.')
        }

        const userValue = await this.findUser(id)

        userValue.nome = nome
        userValue.email = email
        userValue.senha = await bcrypt.hash(senha, SALT_VALUE)
        userValue.save()

        return userValue
    }

    async delete(id) {
        if (!id) {
            throw new Error('Id é obrigatório.')
        }
        const userValue = await this.findUser(id)

        if(!userValue) {
            throw new Error('User nao encontrado')
        }

        await userValue.destroy()
    }

    async find() {
        const users = await user.findAll()
        return users
    }

    // Serve para fazer login com e email e senha do usuario, ele vai retornar error se os campos estiferem vazios
    async login(email, senha) {
        if (!email || !senha) {
            throw new Error('Email e senha são obrigatórios.')
        }

        const userValue = await user.findOne({ where: { email }})

        if (!userValue) {
            throw new Error('[1] Email inválidos.')
        }

        const senhaValida = await bcrypt.compare(senha, userValue.senha) 
        if (!senhaValida) {
            throw new Error('[2] Senha inválidos.')
        }

        const jwtToken = jwt.sign({ id: userValue.id }, SECRET_KEY);
        console.log('Sucesso', 'Usuario logado com sucesso');

        return { token: jwtToken }
    }

    // Verifica se o token é valido e retorna o payload
    async validateToken(token) {
        if (!token) {
            throw new Error('Token inválido')
        }

        try {
            await jwt.verify(token, SECRET_KEY)
        } catch {
            throw new Error('Token inválido')
        }
    }
} 

module.exports = new UserController()