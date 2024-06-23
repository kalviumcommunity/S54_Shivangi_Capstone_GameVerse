const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    last_login: { type: Date },
    friends: [
        {
            user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            username: { type: String }
        }
    ],
    game_stats: {
        total_games_played: { type: Number, default: 0 },
        total_games_won: { type: Number, default: 0 },
        categories: [
            {
                category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'GameCategory' },
                category_name: { type: String },
                games_played: { type: Number, default: 0 },
            }
        ],
        games: {
            type: [{
                game_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Game' },
                games_played: { type: Number, default: 0 },
            }],
            default: []
        }
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;