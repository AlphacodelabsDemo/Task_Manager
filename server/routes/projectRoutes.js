const express = require('express');

const {
    deleteProject,
    createProject,
    updateProject,
    getAllProjects,
    getProjectById,
  } = require('../controllers/ProjectController');
  const verifyToken = require('../middleware/verifyToken');
  
  const router = express.Router();

  router.post('/projects/create', verifyToken, createProject);
router.delete('/projects/:id', deleteProject);
router.put('/projects/:id', updateProject);
router.get('/projects', getAllProjects);
router.get('/projects/:id', getProjectById);

module.exports = router;