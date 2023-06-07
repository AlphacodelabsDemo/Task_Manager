const Task = require('../model/TaskModel')
const mongoose = require('mongoose')


//delete workout
const deleteTask = async (req,res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({message: "Invalid id no such Task"})
    }

    const task = await Task.findOneAndDelete({_id: id})

    if(!task) {
        return res.status(400).json({error: 'No such workout'})
    }

    res.status(200).json(task)
}

module.exports = {
    deleteTask
}
