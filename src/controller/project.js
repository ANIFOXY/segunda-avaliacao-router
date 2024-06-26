const project = require('../model/project')
const post = require('../model/project')
const UserController = require('./user')

class projectController {
    async createProject(nome, descrisao) {
        if(!nome || !descrisao) {
            throw new Error('Nome ou descrisao sao obrigatorios.')
        }

    const projectValue = await post.create({
        nome,
        descrisao
    })

    return projectValue
    }

    async findPost(id) {
        if (!id) {
            throw new Error('Id é obrigatório.')
        }

        const projectValue = await post.findByPk(id)
        
        if (!projectValue) {
            throw new Error('Postagem não encontrada.')
        }

        return projectValue
    }

    async editar(id, nome, descrisao) {
        if (!id || !nome || !descrisao) {
            throw new Error('Id, nome e descisao são obrigatorios.')
        }

        await UserController.findUser(id)

        const projectValue = await this.findPost(id)

        projectValue.nome = nome
        projectValue.descrisao = descrisao
        projectValue.save()

        return projectValue
    }

    async deletar(id) {
        if (!id) {
            throw new Error('Id é obrigatorio')
        }
        const projectValue = await this.findPost(id)
        projectValue.destroy()

        return
    }

    async find() {
        return project.findAll()
    }
}
    module.exports = new projectController()
