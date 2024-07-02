const projectController = require('../controller/project')

class ProjectApi {
    async createProject(req, res) {
        const { nome, descricao, userId } = req.body
        
        try {
            const project = await projectController.createProject(nome, descricao, userId)
            return res.status(201).send(project)
        } catch (e) {
            return res.status(400).send({ error: `Erro ao criar projeto ${e.message}`})
        }
    }

    async updateProject(req, res) {
        const { id } = req.params
        const { nome, descricao, userId } = req.body

        try {
            const project = await projectController.updateProject(Number(id), nome, descricao, userId)
            return res.status(200).send(project)
        } catch (e) {
            return res.status(400).send({ error: `Error ao editar projeto ${e.message}`})
        }
    }

    async deleteProject(req, res) {
        const { id } = req.params
        const { userId } = req.body

        try {
            await projectController.deleteProject(Number(id), userId)
            return res.status(204).send({ message: 'Projeto deletado com sucesso' })
        } catch (e) {
            return res.status(400).send({ error: `Erro ao deletar projeto ${e.message}`})
        }
    }

    async ListarProjetos(req, res) {
        const { userId } = req.params;
 
        try {
            const projects = await projectController.ListarProjetos(userId);
            return res.status(200).send(projects);
        } catch (error) {
            return res.status(400).send({ error: error.message });
        }
    }

}

module.exports = new ProjectApi()