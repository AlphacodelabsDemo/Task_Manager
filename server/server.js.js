// Import required modules
const express = require("express");
<<<<<<< HEAD:server/server.js.js
const AuthRoutes = require("./routes/authRoutes");
const taskRoutes = require('./routes/taskRoutes')

//express app
=======
const cors = require("cors");
>>>>>>> 2871bafecd7aaaaef3f64866940960c3d3767ce1:server/app.js
const app = express();

// Load environment variables
require("dotenv").config();

<<<<<<< HEAD:server/server.js.js
const cors = require("cors");
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
=======
// Import database connection function
const dbConnection = require("./config/database");

// Middlewares
>>>>>>> 2871bafecd7aaaaef3f64866940960c3d3767ce1:server/app.js
app.use(express.json());
app.use(cors());

// Import routes
const authRoutes = require("./routes/authRoutes");

// Register routes
app.use('/api/auth', authRoutes);

// Get the port from environment variables
<<<<<<< HEAD:server/server.js.js
const PORT = process.env.PORT;

=======
const PORT = process.env.PORT || 8080; // Provide a default port if not specified in the environment
>>>>>>> 2871bafecd7aaaaef3f64866940960c3d3767ce1:server/app.js

// Function to start the server
const startServer = async () => {
  // Connect to the database
  await dbConnection();
<<<<<<< HEAD:server/server.js.js
=======

>>>>>>> 2871bafecd7aaaaef3f64866940960c3d3767ce1:server/app.js
  // Start listening on the specified port
  app.listen(PORT, () => {
    console.log("Server is listening on PORT: " + PORT);
  });
};

// Invoke the function to start the server
startServer();

