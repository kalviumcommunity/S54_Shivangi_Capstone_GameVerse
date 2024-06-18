const Game = require('../models/game');
const GameCategory = require('../models/gameCategory');

async function getAllGames(req, res) {
    try {
        const games = await Game.find({}).populate('category', "name description");
        res.status(200).json(games);
    } catch (error) {
        console.error('Error fetching games:', error);
        res.status(500).send({ error: 'Error fetching games' });
    }
}

async function getGameWithCategory(req, res) {
    try {
        const game = await Game.findOne({ title: req.params.title }).populate('category', "name description");
        if (!game) {
            return res.status(404).send({ error: 'Game not found' });
        }
        res.status(200).json(game);
    } catch (error) {
        res.status(500).send({ error: 'Error fetching game data' });
    }
}

async function getGamesInCategory(req, res) {
    try {
        const games = await Game.find({ category: req.params.category_id }).populate('category', "name description");
        res.status(200).json(games);
    } catch (error) {
        res.status(500).send({ error: 'Error fetching games' });
    }
}

module.exports = {
    getAllGames,
    getGameWithCategory,
    getGamesInCategory,
};
