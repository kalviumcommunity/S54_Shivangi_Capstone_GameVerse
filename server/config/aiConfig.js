const { ChatGoogleGenerativeAI } = require('@langchain/google-genai');
const { HumanMessage } = require('@langchain/core/messages');
require('dotenv').config({path: "../.env"});

const GeminiAImodel = new ChatGoogleGenerativeAI({
  modelName: 'gemini-pro',
  apiKey: process.env.GEMINI_API_KEY,
});

/**
 * Asynchronously calls the Google Generative AI API to generate a response for a given query.
 *
 * @param {string} query - The user's query to be used to generate a response.
 * @return {Promise<string>} A promise that resolves to the generated response from the API.
 * @throws {Error} If there is an error generating the response.
 */
async function googleGeminiCall(query) {
  let response = "";
  try {
    // Create a new HumanMessage object with the user's query as the content.
    const message = new HumanMessage({ content: [{ type: 'text', text: query }] });

    // Invoke the Google Generative AI model with the HumanMessage as the input.
    const res = await GeminiAImodel.invoke([message]);

    // Extract the generated response from the response object.
    response = res.text;
  } catch (error) {
    // Log the error and re-throw it.
    console.error('Error generating response:', error);
    throw error;
  }

  // Return the generated response.
  return response;
}

module.exports = googleGeminiCall;