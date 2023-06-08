// Import required modules
const express = require("express");
const AuthRoutes = require("./routes/authRoutes");
const TaskRoutes = require("./routes/taskRoutes");
// Import database connection function
const dbConnection = require("./config/database");

//express app
const app = express();
const cors = require("cors");

// Load environment variables
require("dotenv").config();

// middlewares
app.use((req,res,next) =>{
  console.log(req.path,req.method)
  next()
})
app.use(express.json());
app.use(cors());

//routes
app.use('/api/auth',AuthRoutes);
app.use('/api/tasks',TaskRoutes);

// Get the port from environment variables
const PORT = process.env.PORT || 8080; // Provide a default port if not specified in the environment

// Function to start the server
const startServer = async () => {
  // Connect to the database
  await dbConnection();

  // Start listening on the specified port
  app.listen(PORT, () => {
    console.log("Server is listening on PORT: " + PORT);
  });
};

// Invoke the function to start the server
startServer();

