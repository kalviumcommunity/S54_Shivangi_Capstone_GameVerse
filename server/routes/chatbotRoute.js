const express = require("express")
const chatbotRoute = express.Router()
// const googleGeminiCall = require("../config/aiConfig")
const aiChatHandler = require("../handlers/aiChatHandler")


chatbotRoute.post("/chatbot", aiChatHandler)

module.exports = chatbotRoute 