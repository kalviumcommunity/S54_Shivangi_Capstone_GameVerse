const { ChatGoogleGenerativeAI } = require('@langchain/google-genai');
const { HumanMessage } = require('@langchain/core/messages');
require('dotenv').config({path: "../.env"});

const GeminiAImodel = new ChatGoogleGenerativeAI({
  modelName: 'gemini-pro',
  apiKey: process.env.GEMINI_API_KEY,
});

async function googleGeminiCall(query) {
  let response = "";
  try {
    const message = new HumanMessage({ content: [{ type: 'text', text: query }] });
    const res = await GeminiAImodel.invoke([message]);
    response = res.text;
  } catch (error) {
    console.error('Error generating response:', error);
    throw error;
  }
  return response;
}

module.exports = googleGeminiCall;