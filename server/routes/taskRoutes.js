const express = require('express')
const {deleteTask, postTask ,updateTask} =require('../controllers/TaskControllers');
const verifyToken = require("../middleware/verifyToken");


const router = express.Router()


//Delete a task

router.post("/create",verifyToken, postTask);
router.delete('/:id',deleteTask);
router.put('/:id',updateTask);

module.exports = router;