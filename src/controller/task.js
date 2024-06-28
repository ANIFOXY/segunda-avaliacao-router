const task = require('../model/task')
const projectController = require('./project')
const UserController = require('../controller/user')
const user = require('../model/user')

class TaskController {
    async createTask(titulo, descrisao, projectId, userId) {
        if (!titulo || !descrisao || !projectId || !userId) {
            throw new Error('Titulo, descrisao, projectId e userId sao obrigatorios')
        }


        await UserController.findUser(Number(userId))
        
        if (titulo.length > 100) {
            throw new Error('Titulo deve ter no maximo 100 caracteres')
        }

        const project = await projectController.findProject(projectId)

        if (project.userId !== userId) {
            throw new Error('Voce nao é autorizado a criar a task para projeto')
        }

        const taskValue = await task.create({
            titulo,
            descrisao,
            projectId,
            userId,
            status: 'pendente'
        })

        return taskValue
    }

    async updateTask(id, titulo, descrisao, status, conclusaoData, userId) {
        if (!id || !titulo || !descrisao || !status || !userId) {
            throw new Error('Id, titulo, descrisao, status e userId sao obrigatorios')
        }

        if (titulo.length > 100) {
            throw new Error('Titulo deve ter no maximo 100 caracteres')
        }

        const taskValue = await task.findByPk(id)

        if (taskValue.userId !== userId) {
            throw new Error('Voce nao é autorizado a Editar essa Task')
        }

        taskValue.titulo = titulo
        taskValue.descrisao = descrisao
        taskValue.status = status
        if (conclusaoData) {
            taskValue.conclusaoData = conclusaoData
        }

        await taskValue.save()
        return taskValue
    }

    async deleteTask(id, userId) {
        if (!id || !userId) {
            throw new Error('Id e userId sao obrigatorios')
        }

        const taskValue = await task.findByPk(id)

        if (!taskValue) {
            throw new Error('Task nao encontrada')
        }

        if (taskValue.userId !== userId) {
            throw new Error('Voce nao é autorizado a deletar essa task')
        }

        await taskValue.destroy()
    }

    async ListarTasks(projectId, userId, status) {
        if (!projectId || !userId) {
            throw new Error('ProjectId e userId sao obrigatorios')
        }

        const project = await projectController.findProject(projectId)

        if (project.userId !== userId) {
            throw new Error('Voce nao tem autorizacao para ver esse projeto')
        }

        const filter = { where: { projectId, userId} }
        if (status) {
            filter.where.status = status
        }

        const tasks = await task.findAll(filter)
        return tasks
    }
}

module.exports = new TaskController()