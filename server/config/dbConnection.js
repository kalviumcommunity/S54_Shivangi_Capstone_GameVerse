// This file contains the function to connect to the MongoDB database

// Import the mongoose library for interacting with MongoDB
const mongoose = require('mongoose')

// Import the dotenv library to load environment variables from .env file
require('dotenv').config({ path: '../.env' });

/**
 * This function connects to the MongoDB database specified in the .env file
 * It returns a promise that resolves to the connected mongoose instance
 * @returns {Promise} A promise that resolves to the connected mongoose instance
 */
function connectToDB() {
    // Connect to the MongoDB database using the MONGO_URL environment variable
    return mongoose.connect(process.env.MONGO_URL)
}

// Export the connectToDB function so it can be used in other files
module.exports = connectToDB;
