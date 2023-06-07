const Task = require('../model/Task')
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


//create task

const postTask = async (req, res) => {
    try {
      const { description } = req.body;
      if (!description) {
        return res.status(400).json({ status: false, msg: "Description of task not found" });
      }
      const task = await Task.create({ user: req.user.id, description });
      res.status(200).json({ task, status: true, msg: "Task created successfully.." });
    }
    catch (err) {
      console.error(err);
      return res.status(500).json({ status: false, msg: "Internal Server Error" });
    }
  }

  module.exports = {
    deleteTask,
    postTask
  };
  