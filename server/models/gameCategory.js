const mongoose = require("mongoose")

/**
 * The schema for a game category.
 * Contains the name, description, and image URL of a category.
 */
const gameCategorySchema = new mongoose.Schema({
    // The name of the category.
    name: { type: String, required: true },
    // The description of the category.
    description: { type: String },
    // The URL of the category's image.
    image_url: { type: String, required: true }
});

// Create a model for the game category schema.
const GameCategory = mongoose.model('GameCategory', gameCategorySchema);

// Export the GameCategory model.
module.exports = GameCategory;
