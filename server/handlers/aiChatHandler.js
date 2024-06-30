const googleGeminiCall = require("../config/aiConfig")

const aiChatHandler = async (req, res) => {
    try {
        const { query } = req.body;
        if (!query || typeof query !== 'string') {
            return res.status(400).json({ error: 'Invalid or missing query in request body' });
        }
        const response = await googleGeminiCall(query);
        res.json({ response });
    } catch (error) {
        if (error instanceof SyntaxError) {
            res.status(400).json({ error: 'Invalid JSON in request body' });
        } else if (error.name === 'ValidationError') {
            res.status(422).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

}
module.exports =  aiChatHandler 