const TaskController = require('../controller/task')
const task = require('../model/task')

class TaskApi {
    async createTask(req, res) {
        const { titulo, descrisao, projectId } = req.body
        const userId = req.userId

        try {
            const task = await TaskController.createTask(titulo, descrisao, projectId, userId)
            return res.status(201).send(task)
        } catch (e) {
            return res.status(400).send({ error: `Erro ao criar Task: ${e.message}` })
        }
    }

    async updateTask(req, res) {
        const { id } = req.params
        const { titulo, descrisao, status, conclusaoData } = req.body
        const userId = req.userId

        try { 
            const task = await TaskController.updateTask(Number(id), titulo, descrisao, status, conclusaoData, userId)
            return res.status(200).send(task)
        } catch (e) {
            return res.status(400).send({ error: `Erro ao Editar Task: ${e.message}` })
        }
    }

    async deleteTask(req, res) {
        const { id } = req.params
        const { userId } = req.userId

        try {
            await TaskController.deleteTask(Number(id), userId)
            return res.status(204).send()
        } catch (e) {
            return res.status(400).send({ error: `Erro ao deletar Task`})
        }
    }

    async ListarTasks(req,res) {
        const { projectId } = req.params
        const { status } = req.query
        const userId = req.userId

        try {
            const tasks = await TaskController.ListarTasks(Number(projectId), userId, status)
            return res.status(200).send(tasks)
        } catch (e) {
            return res.status(400).send({ error: `Erro ao listar Task: ${e.message}`})
        }
    }
}

module.exports = new TaskApi()