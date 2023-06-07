const express = require('express')
const {
    deleteTask, postTask
} =require('../controllers/TaskControllers')

const router = express.Router()


//Delete a task
router.delete('/:id',deleteTask);
router.post("/:id", postTask);

module.exports = router