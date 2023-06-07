const router = require("express").Router();
const userController = require("../controllers/UserController");
const loginController = require("../controllers/LoginController");


router.post("/login", loginController.loginUser);
router.post("/signup", userController.createUser);

module.exports = router;