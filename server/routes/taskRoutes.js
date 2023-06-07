const express = require('express')
const {
    deleteTask,
} =require('../controllers/taskControllers')

const router = express.Router()


//Delete a task
router.delete('/:id',deleteTask)

module.exports = router