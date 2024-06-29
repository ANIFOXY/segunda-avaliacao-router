const jwt = require('jsonwebtoken')
const { SECRE_KEY } = require('../controller/user')
const UserController = require('../controller/user')

const { JsonWebTokenError } = require('jsonwebtoken')
const project = require('../model/project')

class projectController {
    async createProject(nome, descricao, userId) {
        if(!nome || !descricao || !userId) {
            throw new Error('Nome, descricao e userId sao obrigatorios.')
        }

        await UserController.findUser(Number(userId))
        
          if (nome.length > 100) {
            throw new Error('Nome deve ter no maximo 100 caracteres')
       }

    const projectValue = await project.create({
        nome,
        descricao,
        userId
    })

    return projectValue
    }

    async findProject(id) {
        if (!id) {
            throw new Error('Id é obrigatório.')
        }

        const projectValue = await project.findByPk(id)
        
        if (!projectValue) {
            throw new Error('Projeto não encontrada.')
        }

        return projectValue
    }

    async updateProject(id, nome, descricao, userId) {
        if (!id || !nome || !descricao || !userId) {
            throw new Error('Id, nome, descricao e userId são obrigatorios.')
        }

        await UserController.findUser(Number(userId))


        if (nome.length > 100) {
            throw new Error('Nome deve ter no maximo 100 caracteres')
        }

        const projectValue = await this.findProject(id)

        if (projectValue.userId !== userId) {
            throw new Error('Voce nao tem autorização para Editar esse projeto')
        }

        projectValue.nome = nome
        projectValue.descricao = descricao
        projectValue.userId = userId
        projectValue.save()

        return projectValue
    }

    async deleteProject(id, userId) {
        if (!id || !userId) {
            throw new Error('Id é obrigatorio')
        }

        await UserController.findUser(Number(userId))

        const projectValue = await this.findProject(id)

        if (!projectValue) {
            throw new Error('Projeto nao encontrado.')
        }

        if (projectValue.userId !== userId) {
            throw new Error('Voce nao tem autorizacao de deletar esse projeto')
        }

        projectValue.userId = userId

        await projectValue.destroy()
    }

    async ListarProjetos(userId) {
        if (!userId) {
            throw new Error('Id do user é obrigatório');
        }

        const projects = await project.findAll({ where: { userId } })
        return projects
    }

    async validarToken(token) {
        if (!token) {
            throw new Error('Token não fornecido');
        }

        try {
                await jwt.verify(token, SECRE_KEY)
        } catch (error) {
            throw new Error('Erro na validação do token: ' + error.message);
        }
    }
}

module.exports = new projectController()
