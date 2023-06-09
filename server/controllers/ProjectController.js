const Project = require('../model/Project');

const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const {taskValidate} = require("../utils/validaters");



// Delete a project
const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid project ID" });
    }

    const project = await Project.findOneAndDelete({ _id: id });

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Create a project
const createProject = async (req, res) => {
    try {
      const { name, tasks, collaborators, dueDate } = req.body;
  
      const project = new Project({
        name,
        tasks,
        collaborators,
        dueDate,
      });
  
      await project.save();
  
      res.status(201).json({ project, status: true, msg: 'Project created successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create the project' });
    }
  };
  

// Update a project
const updateProject = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid project ID" });
    }

    const updatedProject = await Project.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedProject) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.status(200).json({ updatedProject, status: true, msg: 'Project updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get all projects
const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json({ projects, status: true, msg: 'Projects retrieved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get a project by ID
const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid project ID" });
    }

    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.status(200).json({ project, status: true, msg: 'Project retrieved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  deleteProject,
  createProject,
  updateProject,
  getAllProjects,
  getProjectById,
};
