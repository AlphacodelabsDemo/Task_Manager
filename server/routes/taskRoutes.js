const express = require('express')
const {deleteTask, postTask ,updateTask, getTasks, getTask} =require('../controllers/TaskControllers');
const verifyToken = require("../middleware/verifyToken");


const router = express.Router()


//Delete a task
////,verifyToken
router.post("/create", postTask);
router.delete('/:id',deleteTask);
router.put('/:id',updateTask);
router.get("/", verifyToken, getTasks)
router.get("/task", verifyToken, getTask)

module.exports = router;