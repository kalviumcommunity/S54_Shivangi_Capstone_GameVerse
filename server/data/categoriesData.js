const mongoose = require('mongoose');
const GameCategory = require('../models/gameCategory');
require('dotenv').config({ path: '../.env' });

async function seedCategories() {
    try {
        await mongoose.connect(process.env.MONGO_URL);

        // Dummy game categories
        const categories = [
            { name: 'Action', description: 'Games involving action-packed gameplay' },
            { name: 'Adventure', description: 'Games with narrative and exploration elements' },
            { name: 'Puzzle', description: 'Games that challenge mental abilities' },
            { name: 'Shooting', description: 'Games focused on shooting mechanics' },
            { name: 'Arcade', description: 'Classic arcade-style games' },
            { name: 'Casual', description: 'Games designed for relaxed, leisurely gameplay' },
            { name: 'Multiplayer', description: 'Games that can be played with multiple players' },
            { name: 'Cards', description: 'Card-based games' },
            { name: 'Racing', description: 'Games centered around racing competitions' },
            { name: 'Other', description: 'Games that do not fit into the predefined categories' }
        ];

        // Insert dummy data
        await GameCategory.insertMany(categories);
        console.log('Dummy categories inserted successfully');

        // Disconnect after seeding
        mongoose.disconnect();
    } catch (error) {
        console.error('Error seeding categories:', error);
    }
}

seedCategories();
