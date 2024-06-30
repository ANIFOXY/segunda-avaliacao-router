const task = require('../model/task')
const projectController = require('./project')
const UserController = require('../controller/user')

class TaskController {
    async createTask(titulo, descricao, projectId, userId) {
        if (!titulo || !descricao || !projectId || !userId) {
            throw new Error('Titulo, descricao, projectId e userId sao obrigatorios')
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
            descricao,
            projectId,
            userId,
            status: 'pendente'
        })

        return taskValue
    }

    async findTask(id) {
        if(!id) {
            throw new Error('Id é obrigatorio')
        }

        const taskValue = await task.findByPk(id)

        if (!taskValue) {
            throw new Error('Task nao encontrada')
        }

        return taskValue
    }

    async updateTask(id, titulo, descricao, status, conclusaoData, userId) {
        if (!id || !titulo || !descricao || !userId) {
            throw new Error('Id, titulo, descricao, status e userId sao obrigatorios')
        }

        await UserController.findUser(Number(userId))

        if (titulo.length > 100) {
            throw new Error('Titulo deve ter no maximo 100 caracteres')
        }

        const taskValue = await task.findByPk(id)

        if (taskValue.userId !== userId) {
            throw new Error('Voce nao é autorizado a Editar essa Task')
        }

        taskValue.titulo = titulo
        taskValue.descricao = descricao
        taskValue.status = status
        taskValue.conclusaoData = conclusaoData
        await taskValue.save()

        return taskValue
    }

    async deleteTask(id, userId) {
        if (!id || !userId) {
            throw new Error('Id e userId sao obrigatorios')
        }

        await UserController.findUser(Number(userId))

        const taskValue = await this.findTask(id)

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
        const filter = {where: {projectId, userId}}

        if (status) {
            filter.where.status = status
        }

        const tasks = await task.findAll(filter)
        return tasks
    }
}

module.exports = new TaskController()