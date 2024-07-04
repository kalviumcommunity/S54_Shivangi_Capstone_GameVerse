const mongoose = require('mongoose');

// Define the schema for a game
const gameSchema = new mongoose.Schema({
    // The title of the game
    title: { type: String, required: true },
    // The description of the game
    description: { type: String },
    // The URL of the game's image
    image_url: { type: String, required: true },
    // The URL of the game's iframe
    iframe_url: { type: String, required: true },
    // The category of the game
    category: {
        // The ID of the game category
        type: mongoose.Schema.Types.ObjectId,
        // Reference the game category model
        ref: 'GameCategory'
    },
    // Uncomment this line to use a string instead of a reference to the game category model
    // category: { type: String }
});

// Create a model for the game schema
const Game = mongoose.model('Game', gameSchema);

// Export the Game model
module.exports = Game;

