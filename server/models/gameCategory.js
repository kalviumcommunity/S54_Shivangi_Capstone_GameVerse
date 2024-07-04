const mongoose = require("mongoose")

const gameCategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    image_url: { type: String, required: true }
});

const GameCategory = mongoose.model('GameCategory', gameCategorySchema);
module.exports = GameCategory;