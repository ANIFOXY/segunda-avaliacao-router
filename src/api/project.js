const projectController = require('../controller/project')

class ProjectApi {
    async createProject(req, res) {
        const { nome, descricao } = req.body
        const userId = req.userId

        try {
            const project = await projectController.createProject(nome, descricao, userId)
            return res.status(201).send(project)
        } catch (e) {
            return res.status(400).send({ error: `Erro ao criar projeto ${e.message}`})
        }
    }

    async updateProject(req, res) {
        const { id } = req.params
        const { nome, descrisao } = req.body
        const userId = req.userId

        try {
            const project = await projectController.updateProject(Number(id), nome, descrisao, userId)
            return res.status(200).send(project)
        } catch (e) {
            return res.status(400).send({ error: `Error ao editar projeto ${e.message}`})
        }
    }

    async deleteProject(req, res) {
        const { id } = req.params
        const userId = req.userId

        try {
            await projectController.deleteProject(Number(id), userId)
            return res.status(204).send()
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

    // Método para validar o token
    async validarToken(req, res, next) {
        const token = req.headers.authorization;

        try {
            await projectController.validarToken(token);
            next();
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }
}

module.exports = new ProjectApi()