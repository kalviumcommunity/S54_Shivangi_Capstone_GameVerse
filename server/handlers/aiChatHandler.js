const rateLimit = require("express-rate-limit");
const googleGeminiCall = require("../config/aiConfig");

/**
 * Custom handler for rate limit exceeded.
 * This function is called when the rate limit is exceeded.
 * It sends a JSON response with an error message.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @param {Object} options - The options object containing the status code.
 */
const rateLimitExceededHandler = (req, res, next, options) => {
    // Send a JSON response with an error message
    res.status(options.statusCode).json({
        error: 'Too many requests',
        message: 'You have exceeded the number of allowed requests. Please try again after some time.'
    });
};

// Rate limiter middleware
const aiChatHandlerLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 10,
    handler: rateLimitExceededHandler,
});

/**
 * Handler function for AI chat requests.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 */
async function aiChatHandler(req, res) {
    try {
        // Extract the query from the request body
        const { query } = req.body;

        // Check if the query is valid
        if (!query || typeof query !== 'string' || !query.trim()) {
            // Return an error response if the query is invalid
            return res.status(400).json({ error: 'Invalid or missing query in request body' });
        }

        // Call the AI API with the query
        const response = await googleGeminiCall(query.trim());

        // Send the response back to the client
        res.json({ response });
    } catch (error) {
        // Log the error
        console.error('Error in aiChatHandler:', error);

        // Handle different types of errors
        if (error instanceof SyntaxError) {
            // Return an error response if the request body is not valid JSON
            res.status(400).json({ error: 'Invalid JSON in request body' });
        } else if (error.name === 'ValidationError') {
            // Return an error response if there is a validation error
            res.status(422).json({ error: error.message });
        } else {
            // Return an error response for any other type of error
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

module.exports = { aiChatHandler, aiChatHandlerLimiter };
