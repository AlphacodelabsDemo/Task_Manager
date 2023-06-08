const mongoose = require("mongoose");
const moment = require('moment-timezone');
const jwt = require("jsonwebtoken");
require('dotenv').config();


const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  joiningTime: { type: String, default: moment().tz('Asia/Kolkata').format() },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

userSchema.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY);
    this.tokens = this.tokens.concat({ token });
    await this.save();
    return this.save();
  } catch (error) {
    console.error(error); // Use console.error for error logging
    console.log("having a problem with authToken");
  }
};

const User = mongoose.model("User", userSchema); // Capitalize model name

module.exports = User;
