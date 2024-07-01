const TaskController = require('../controller/task')

class TaskApi {
    async createTask(req, res) {
        const { titulo, descrisao, projectId, userId } = req.body

        try {
            const task = await TaskController.createTask(titulo, descrisao, projectId, userId)
            return res.status(201).send(task)
        } catch (e) {
            return res.status(400).send({ error: `Erro ao criar Task: ${e.message}` })
        }
    }

    async updateTask(req, res) {
        const { id } = req.params
        const { titulo, descrisao, status, conclusaoData, userId } = req.body

        try { 
            const task = await TaskController.updateTask(Number(id), titulo, descrisao, status, conclusaoData, userId)
            return res.status(200).send(task)
        } catch (e) {
            return res.status(400).send({ error: `Erro ao Editar Task: ${e.message}` })
        }
    }

    async deleteTask(req, res) {
        const { id } = req.params
        const { userId } = req.body

        try {
            await TaskController.deleteTask(Number(id), userId)
            return res.status(204).send()
        } catch (e) {
            return res.status(400).send({ error: `Erro ao deletar Task: ${e.message}` })
        }
    }

    async ListarTasks(req,res) {
        const { projectId, userId } = req.params
        const { status } = req.query

        try {

            if(!projectId || !userId) {
                throw new Error('ProjectId e userId sao obrigatorios')
            }

            const tasks = await TaskController.ListarTasks(Number(projectId), userId, status)
            return res.status(200).send(tasks)
        } catch (e) {
            return res.status(400).send({ error: `Erro ao listar Task: ${e.message}`})
        }
    }

}

module.exports = new TaskApi()