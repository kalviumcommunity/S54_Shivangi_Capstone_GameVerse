const mongoose = require('mongoose');
const Game = require('../models/game');
const GameCategory = require('../models/gameCategory');
require('dotenv').config({ path: '../.env' });

async function seedGames() {
    try {
        await mongoose.connect(process.env.MONGO_URL);

        // Fetch categories to get their IDs
        const actionCategory = await GameCategory.findOne({ name: 'Action' });
        const shootingCategory = await GameCategory.findOne({ name: 'Shooting' });

        // Dummy games
        const games = [
            {
                title: 'Fatal Duel',
                description: 'This is a 1 vs 1 fighting game.',
                category: actionCategory._id,
                iframe_url: 'https://fatal-duel.netlify.app/',
                image_url: "https://i.ibb.co/5WyGBKf/Screenshot-2024-06-19-011001.png"
            },
            {
                title: 'Zombie Shooter',
                description: 'This is a shooting game.',
                category: shootingCategory._id,
                iframe_url: 'https://shivangi-jain-08.github.io/zombie-shoot-game/',
                image_url: "https://i.ibb.co/GcRBTWM/Screenshot-2024-06-19-010657.png"
            },
        ];

        // Insert dummy data
        await Game.insertMany(games);
        console.log('Dummy games inserted successfully');

        // Disconnect after seeding
        mongoose.disconnect();
    } catch (error) {
        console.error('Error seeding games:', error);
    }
}

seedGames();
