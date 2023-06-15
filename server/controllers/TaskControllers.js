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
    const { aim,assignees, dueDate ,updatedStatus} = req.body;
    const user = req.user._id;

    // Create a new task using the Task model
    const task = new Task({
      user,
      aim,
      assignees,
      dueDate,
      updatedStatus
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
///-----------
// Get all tasks for a user
  const getTasks = async (req, res) => {
    try {
      const { assignees, updatedStatus, dueDate } = req.query;
  
      const query = {};
  
      if (assignees) {
        query.assignees = { $regex: assignees, $options: 'i' };
      }
  
      if (updatedStatus) {
        query.updatedStatus = { $regex: updatedStatus, $options: 'i' };
      }
  
      if (dueDate) {
        query.dueDate = { $regex: dueDate, $options: 'i' };
      }
  
      const tasks = await Task.find(query);
      res.status(200).json({ tasks, status: true, msg: "Tasks found successfully." });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ status: false, msg: "Internal Server Error" });
    }
  };

  //get user task

  const getUserTask = async (req, res) => {
    try {
      const tasks = await Task.find({ user: req.user.id });
      res.status(200).json({ tasks, status: true, msg: "Tasks found successfully.." });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ status: false, msg: "Internal Server Error" });
    }
  };


const getTaskById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID, no such task" });
  }

  try {
    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch the task" });
  }
};




module.exports = {
    deleteTask ,updateTask, postTask, getTasks, getUserTask,getTaskById,
}
