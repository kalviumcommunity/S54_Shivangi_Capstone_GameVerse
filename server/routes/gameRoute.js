const express = require('express');
const gameRoute = express.Router();
const gameHandler = require('../handlers/gameHandler');


gameRoute.get('/', gameHandler.getAllGames);
gameRoute.get('/:title', gameHandler.getGameWithCategory);
gameRoute.get('/category/:category_id', gameHandler.getGamesInCategory);

module.exports = gameRoute;