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
        if (id === undefined) {
            throw new Error('Id é obrigatório.')
        }

        const projectValue = await post.findByPk(id)
        
        if (!projectValue) {
            throw new Error('Postagem não encontrada.')
        }

        return projectValue
    }
}