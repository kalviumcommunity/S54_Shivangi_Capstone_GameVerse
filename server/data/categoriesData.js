const mongoose = require('mongoose');
const GameCategory = require('../models/gameCategory');
require('dotenv').config({ path: '../.env' });

async function seedCategories() {
    try {
        await mongoose.connect(process.env.MONGO_URL);

        // Dummy game categories
        const categories = [
            {
                name: 'Action',
                description: 'Games involving action-packed gameplay',
                image_url: "https://sm.ign.com/ign_in/photo/t/the-best-a/the-best-action-game-of-2023_wej6.jpg"
            },
            {
                name: 'Adventure',
                description: 'Games with narrative and exploration elements',
                image_url: "https://www.gameinformer.com/sites/default/files/styles/thumbnail/public/2022/07/19/7f51ff7f/stray-screenshot-04-en-9jun22.jpg"
            },
            {
                name: 'Puzzle',
                description: 'Games that challenge mental abilities',
                image_url: "https://static.vecteezy.com/system/resources/previews/016/962/381/non_2x/isometric-puzzle-pieces-on-purple-background-free-vector.jpg"
            },
            {
                name: 'Shooting',
                description: 'Games focused on shooting mechanics',
                image_url: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1057850/ss_b0603b96f053cf1c1970c8696dabc5c5f26dd39b.1920x1080.jpg"
            },
            {
                name: 'Arcade',
                description: 'Classic arcade-style games',
                image_url: "https://img.freepik.com/premium-photo/neon-arcade-game-with-city-background_707390-2.jpg"
            },
            {
                name: 'Casual',
                description: 'Games designed for relaxed, leisurely gameplay',
                image_url: "https://cdn6.aptoide.com/imgs/a/a/1/aa11deca24f4c8128ac613d38a43d266_icon.png"
            },
            {
                name: 'Multiplayer',
                description: 'Games that can be played with multiple players',
                image_url: "https://cdn3.vectorstock.com/i/1000x1000/68/52/glowing-neon-line-tic-tac-toe-game-icon-isolated-vector-38286852.jpg"
            },
            {
                name: 'Cards',
                description: 'Card-based games',
                image_url: "https://png.pngtree.com/thumb_back/fw800/background/20231006/pngtree-d-rendering-of-neon-glowing-playing-card-symbols-in-a-poker-image_13530016.png"
            },
            {
                name: 'Racing',
                description: 'Games centered around racing competitions',
                image_url: "https://i.ytimg.com/vi/KUV7QMShsa4/maxresdefault.jpg"
            },
            {
                name: 'Other',
                description: 'Games that do not fit into the predefined categories',
                image_url: "https://img.freepik.com/premium-photo/video-game-controller-with-neon-lights_783990-906.jpg"
            }
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
