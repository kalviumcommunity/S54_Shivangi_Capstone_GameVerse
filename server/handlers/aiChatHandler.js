const rateLimit = require("express-rate-limit");
const googleGeminiCall = require("../config/aiConfig");

// Custom handler for rate limit exceeded
const rateLimitExceededHandler = (req, res, next, options) => {
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

// handler function
async function aiChatHandler(req, res) {
    try {
        const { query } = req.body;

        if (!query || typeof query !== 'string' || !query.trim()) {
            return res.status(400).json({ error: 'Invalid or missing query in request body' });
        }

        const response = await googleGeminiCall(query.trim());
        res.json({ response });
    } catch (error) {
        console.error('Error in aiChatHandler:', error);

        if (error instanceof SyntaxError) {
            res.status(400).json({ error: 'Invalid JSON in request body' });
        } else if (error.name === 'ValidationError') {
            res.status(422).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

module.exports = { aiChatHandler, aiChatHandlerLimiter };
