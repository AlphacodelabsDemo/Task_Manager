const express = require('express')
const {deleteTask, postTask ,updateTask, getTasks, getUserTask} =require('../controllers/TaskControllers');
const verifyToken = require("../middleware/verifyToken");


const router = express.Router()


//Delete a task
////verifyToken,
router.post("/create", postTask);
router.delete('/:id',deleteTask);
router.put('/:id',updateTask);
router.get("/",  getTasks);  //verifyToken,
router.get("/:id",  getTasks);  //verifyToken, get task by id
router.get("/task", verifyToken, getUserTask);

module.exports = router;