// Load environment variables
require("dotenv").config();

// Import required modules
const express = require("express");
const app = express();

// Import database connection function
const dbConnection = require("./config/database");

// Get the port from environment variables
const PORT = process.env.PORT;

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
