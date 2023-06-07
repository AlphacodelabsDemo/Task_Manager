// Import required modules
const express = require("express");
const AuthRoutes = require("./routes/authRoutes");
const taskRoutes = require('./routes/taskRoutes')

//express app
const cors = require("cors");
const app = express();

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
app.use('/api/tasks',taskRoutes)


// Import database connection function
const dbConnection = require("./config/database");



// middlewares
// Import database connection function
const dbConnection = require("./config/database");


// Import routes
const authRoutes = require("./routes/authRoutes");

// Register routes
app.use('/api/auth', authRoutes);

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

