const mongoose = require('mongoose');
require('dotenv').config();

const DB_URL = process.env.DB_URL;

const connectToDatabase = async () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  try {
    await mongoose.connect(DB_URL, connectionParams);
    console.log('Connected to Database successfully.');
  } catch (err) {
    console.log(err);
    console.log('Error while connecting to Database.');
  }
};

module.exports = connectToDatabase;

