const project = require('../model/project')

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

    async updateProject(id, nome, descrisao, userId) {
        if (!id || !nome || !descrisao || !userId) {
            throw new Error('Id, nome, descisao e userId são obrigatorios.')
        }

        const projectValue = await this.findByPk(id)

        projectValue.nome = nome
        projectValue.descrisao = descrisao
        projectValue.userId = userId
        projectValue.save()

        return projectValue
    }

    async deleteProject(id) {
        if (!id) {
            throw new Error('Id é obrigatorio')
        }
        const projectValue = await this.findByPk(id)

        if (!projectValue) {
            throw new Error('Projeto nao encontrado.')
        }

        await projectValue.destroy()
    }

    async ListarProjetos(userId) {
        if (!userId) {
            throw new Error('Id do autor é obrigatório');
        }

        const projects = await project.findAll({ where: { autorId } });
        return projects;
    }

    async validarToken(token) {
        try {
            if (!token) {
                throw new Error('Token não fornecido');
            }
        } catch (error) {
            throw new Error('Erro na validação do token: ' + error.message);
        }
    }
}
    module.exports = new projectController()
