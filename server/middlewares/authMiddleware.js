const jwt = require('jsonwebtoken');
require('dotenv').config();

/**
 * Middleware function to authenticate user requests.
 * It checks for a JWT token in the request headers and verifies it.
 * If the token is valid, it adds the decoded user information to the request object.
 * If the token is missing or invalid, it sends an appropriate response.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
const authMiddleware = (req, res, next) => {
    // Extract the token from the request headers
    const token = req.headers.authorization?.split(' ')[1];

    // If token is missing, return an error response
    if (!token) {
        return res.status(401).json({ message: "Access denied, token missing!" });
    }

    try {
        // Verify the token using the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Add the decoded user information to the request object
        req.user = decoded;

        // Call the next middleware function
        next();
    } catch (error) {
        // If the token is invalid, return an error response
        res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = authMiddleware;
