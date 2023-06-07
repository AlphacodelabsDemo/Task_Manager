const  User  = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {authValidate} = require("../utils/validaters");



exports.loginUser=async (req, res) => {
    try {
      const { error } = authValidate(req.body);
      if (error) return res.status(400).send({ message: error.details[0].message });
  
      const user = await User.findOne({ email: req.body.email });
      if (!user) return res.status(401).send({ message: "Invalid Email or Password" });
  
      const validPassword = await bcrypt.compare(req.body.password, user.password);
      if (!validPassword) {
        return res.status(401).send({ message: "Invalid Email or Password" });
      }
  
      const token = jwt.sign({ _id: user._id }, process.env.JWTPRIVATEKEY);
  
      user.tokens.push({ token: token }); // Add the token to the tokens array
      await user.save(); // Save the user model with the updated tokens array
  
      console.log("login:", token);
      res.json({ token, message: "Logged in successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  };