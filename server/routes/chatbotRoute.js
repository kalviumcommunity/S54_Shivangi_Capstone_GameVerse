const express = require("express");
const router = express.Router();
const { aiChatHandler, aiChatHandlerLimiter } = require("../handlers/aiChatHandler");

router.post('/chatbot', aiChatHandlerLimiter, aiChatHandler);

module.exports = router;
