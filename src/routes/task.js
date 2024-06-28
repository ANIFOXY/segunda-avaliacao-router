const express = require('express')
const TaskApi = require('../api/task')
const router = express.Router()

router.post('/', TaskApi.createTask)
router.put('/:id', TaskApi.updateTask)
router.get('/:projectId', TaskApi.ListarTasks)
router.delete('/:id', TaskApi.deleteTask)

module.exports = router