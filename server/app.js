// Import required modules
const express = require("express");
const app = express();

// Load environment variables
require("dotenv").config();

const cors = require("cors");
// middlewares
app.use(express.json());
app.use(cors());

// Import database connection function
const dbConnection = require("./config/database");


const AuthRoutes = require("./routes/authRoutes");
// middlewares
app.use(express.json());
app.use(cors());

// Get the port from environment variables
const PORT = process.env.PORT;


app.use('/api/auth',AuthRoutes);


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
