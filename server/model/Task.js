const mongoose = require("mongoose");
const moment = require('moment-timezone');


const taskSchema = new mongoose.Schema({
  user: {
    type:mongoose.Schema.Types.ObjectId  ,  
    ref: "User",
    required: true
  },
  
  aim: {
    type: String,
    required: true
  },
  assignees: {
    type: String,
    required: true,
    index:true
  },
  dueDate: {
    type: String,
    required: true,
    index:true
  }
, 
updatedStatus:{
  type:String,
  default:false,
  index:true
},
taskCreated : { 
  type: String, 
  default: moment().tz('Asia/Kolkata').format() 
}

});

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
