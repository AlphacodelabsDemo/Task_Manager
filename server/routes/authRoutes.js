// Import dependencies
const router = require('express').Router();
const userController = require('../controllers/UserController');
const loginController = require('../controllers/LoginController');

// Define routes
router.post('/login', loginController.loginUser); // Use single quotes for string literals
router.post('/signup', userController.createUser); // Use camelCase for variable and function names

module.exports = router;