const Task = require('../model/Task');
const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const {taskValidate} = require("../utils/validaters");


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


const postTask= async (req, res) => {
  try {
    const { aim, dueDate, completed } = req.body;
    const user = req.user._id;

    // Create a new task using the Task model
    const task = new Task({
      user,
      aim,
      dueDate,
      completed
    });
    

    // Save the task to the database
    await task.save();

    res.status(201).json({task});
  } catch (error) {
    res.status(500).json({ error: 'Failed to create the task' });
  }
};



  

//update workout

const updateTask = async (req, res) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid id, no such Task" });
    }
  
    const updatedTask = await Task.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
  
    if (!updatedTask) {
      return res.status(404).json({ error: "No such workout" });
    }
  
    res.status(200).json(updatedTask);
  };

module.exports = {
    deleteTask ,updateTask,postTask
}
