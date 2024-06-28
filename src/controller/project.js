const jwt = require('jsonwebtoken')
const { SECRE_KEY } = require('../controller/user')

const { JsonWebTokenError } = require('jsonwebtoken')
const project = require('../model/project')

class projectController {
    async createProject(nome, descrisao, userId) {
        if(!nome || !descrisao || !userId) {
            throw new Error('Nome, descrisao e userId sao obrigatorios.')
        }

        if (nome.length > 100) {
            throw new Error('Nome deve ter no maximo 100 caracteres')
        }

    const projectValue = await project.create({
        nome,
        descrisao,
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

    async updateProject(id, nome, descrisao, userId) {
        if (!id || !nome || !descrisao || !userId) {
            throw new Error('Id, nome, descrisao e userId são obrigatorios.')
        }

        if (nome.length > 100) {
            throw new Error('Nome deve ter no maximo 100 caracteres')
        }

        const projectValue = await this.findProject(id)

        if (projectValue.userId !== userId) {
            throw new Error('Voce nao tem autorização para Editar esse projeto')
        }

        projectValue.nome = nome
        projectValue.descrisao = descrisao
        projectValue.save()

        return projectValue
    }

    async deleteProject(id, userId) {
        if (!id) {
            throw new Error('Id é obrigatorio')
        }

        const projectValue = await this.findProject(id)

        if (!projectValue) {
            throw new Error('Projeto nao encontrado.')
        }

        if (projectValue.userId !== userId) {
            throw new Error('Voce nao tem autorizacao de deletar esse projeto')
        }

        await projectValue.destroy()
    }

    async ListarProjetos(userId) {
        if (!userId) {
            throw new Error('Id do autor é obrigatório');
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
