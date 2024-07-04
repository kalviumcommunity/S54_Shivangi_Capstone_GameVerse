const Game = require('../models/game');
const GameCategory = require('../models/gameCategory');

/**
 * Retrieves all games from the database and sends them as a JSON response.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise<void>} A Promise that resolves when the games are successfully retrieved and sent as a response.
 */
async function getAllGames(req, res) {
    try {
        // Retrieve all games from the database and populate the 'category' field with 'name' and 'description'.
        const games = await Game.find({}).populate('category', "name description");

        // Send the retrieved games as a JSON response with a status code of 200.
        res.status(200).json(games);
    } catch (error) {
        // Log the error and send an error response with a status code of 500.
        console.error('Error fetching games:', error);
        res.status(500).send({ error: 'Error fetching games' });
    }
}

/**
 * Retrieves a game from the database based on its title and sends it as a JSON response.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise<void>} A Promise that resolves when the game is successfully retrieved and sent as a response.
 */
async function getGameWithCategory(req, res) {
    try {
        // Retrieve a game from the database based on its title and populate the 'category' field with 'name' and 'description'.
        const game = await Game.findOne({ title: req.params.title }).populate('category', "name description");

        // If the game is not found, send a 404 response with an error message.
        if (!game) {
            return res.status(404).send({ error: 'Game not found' });
        }

        // Send the retrieved game as a JSON response with a status code of 200.
        res.status(200).json(game);
    } catch (error) {
        // Log the error and send an error response with a status code of 500.
        console.error('Error fetching games:', error);
        res.status(500).send({ error: 'Error fetching game data' });
    }
}

/**
 * Retrieves games from the database based on the category ID and sends them as a JSON response.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise<void>} A Promise that resolves when the games are successfully retrieved and sent as a response.
 */
async function getGamesInCategory(req, res) {
    try {
        // Retrieve games from the database based on the category ID and populate the 'category' field with 'name' and 'description'.
        const games = await Game.find({ category: req.params.category_id }).populate('category', "name description");

        // Send the retrieved games as a JSON response with a status code of 200.
        res.status(200).json(games);
    } catch (error) {
        // Log the error and send an error response with a status code of 500.
        console.error('Error fetching games:', error);
        res.status(500).send({ error: 'Error fetching games' });
    }
}

// function exports
module.exports = {
    getAllGames,
    getGameWithCategory,
    getGamesInCategory,
};
