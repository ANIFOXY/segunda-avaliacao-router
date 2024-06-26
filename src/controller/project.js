const project = require('../model/project')
const UserController = require('./user')

class projectController {
    async createProject(nome, descrisao, userId) {
        if(!nome || !descrisao || !userId) {
            throw new Error('Nome, descrisao e userId sao obrigatorios.')
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
            throw new Error('Id, nome, descisao e userId são obrigatorios.')
        }

        await UserController.findUser(userId)

        const projectValue = await this.findProject(id)

        projectValue.nome = nome
        projectValue.descrisao = descrisao
        projectValue.userId = userId
        projectValue.save()

        return projectValue
    }

    async deleteProject(id, userId) {
        if (!id || !userId) {
            throw new Error('Id e userId são obrigatorio')
        }
        const projectValue = await this.findProject(id)

        if (projectValue.userID !== userId) {
            throw new Error('Usuario nao autorizado.')
        }

        await projectValue.destroy()
    }

    async find(userId) {
        if (!userId) {
            throw new Error('Usuario ID é obrigatorio.')
        }

        return project.findAll({
            where: {
                userId: userId
            }
        })
    }
}
    module.exports = new projectController()
