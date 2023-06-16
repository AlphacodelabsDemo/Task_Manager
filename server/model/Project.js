const mongoose = require("mongoose");
const moment = require('moment-timezone');


const projectSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
      },
    ],
    collaborators: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    dueDate: {
        type: String,
        required: true
      },
      status: {
        type: Boolean,
        default: false
      }
    , taskCreated : { type: String, 
      default: moment().tz('Asia/Kolkata').format() 
    // Add any additional fields relevant to projects
  }});
  
  const Project = mongoose.model('Project', projectSchema);
  module.exports = Project;
  