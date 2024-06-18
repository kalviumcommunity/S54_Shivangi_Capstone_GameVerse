const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    image_url : { type: String, required: true },
    iframe_url: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'GameCategory' },
    // category: { type: String }
});

const Game = mongoose.model('Game', gameSchema);
module.exports = Game;
