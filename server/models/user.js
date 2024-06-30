const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    last_login: { type: Date },
    Verify: {
        type: Boolean,
        default: false,
    },
    Otp: {
        type: String,
    },
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

userSchema.methods.generateOTP = function () {
    const otp = Math.floor(100000 + Math.random() * 900000);
    this.Otp = otp.toString();
    return otp;
};

userSchema.methods.verifyOTP = function (otp) {
    return this.Otp === otp;
};

const User = mongoose.model('User', userSchema);
module.exports = User;