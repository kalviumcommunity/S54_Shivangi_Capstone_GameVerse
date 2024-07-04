// Importing necessary modules and dependencies
const express = require("express");
const router = express.Router();

// Importing the aiChatHandler and aiChatHandlerLimiter functions from the aiChatHandler module
const { aiChatHandler, aiChatHandlerLimiter } = require("../handlers/aiChatHandler");

// Defining the chatbot route and associating it with the aiChatHandler function
// The aiChatHandlerLimiter function is used to limit the rate of requests to prevent abuse
router.post('/chatbot', aiChatHandlerLimiter, aiChatHandler);

// Exporting the router module for use in other parts of the application
module.exports = router;

