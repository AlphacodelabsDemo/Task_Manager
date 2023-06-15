const express = require('express')
const {deleteTask, postTask ,updateTask, getTasks, getUserTask,getTaskById} =require('../controllers/TaskControllers');
const verifyToken = require("../middleware/verifyToken");



const router = express.Router()


//Delete a task


router.post("/create",verifyToken, postTask);
router.delete('/:id',deleteTask);
router.put('/:id',updateTask);
router.get("/",verifyToken, getTasks);  
router.get("/:id",verifyToken,  getTaskById);
router.get("/task", verifyToken, getUserTask);



module.exports = router;