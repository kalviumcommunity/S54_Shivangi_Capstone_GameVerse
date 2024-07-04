const mongoose = require("mongoose");

// Define the schema for a user
const userSchema = new mongoose.Schema({
    // The username of the user
    username: { type: String, required: true, unique: true },
    // The name of the user
    name: { type: String, required: true },
    // The email of the user
    email: { type: String, required: true, unique: true },
    // The password of the user
    password: { type: String, required: true },
    // The date and time when the user was created
    created_at: { type: Date, default: Date.now },
    // The date and time when the user last logged in
    last_login: { type: Date },
    // The default avatar image URL
    avatar: { type: String, default: "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"},
    // Whether the user has verified their email or not
    Verify: {
        type: Boolean,
        default: false,
    },
    // The one-time password (OTP) for email verification
    Otp: {
        type: String,
    },
    // The list of friends of the user
    friends: [
        {
            // The ID of the friend user
            user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            // The username of the friend user
            username: { type: String }
        }
    ],
    // The statistics of the user's gameplay
    game_stats: {
        // The total number of games played by the user
        total_games_played: { type: Number, default: 0 },
        // The total number of games won by the user
        total_games_won: { type: Number, default: 0 },
        // The statistics of the user's gameplay in different categories
        categories: [
            {
                // The ID of the game category
                category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'GameCategory' },
                // The name of the game category
                category_name: { type: String },
                // The number of games played in the category
                games_played: { type: Number, default: 0 },
            }
        ],
        // The list of games played by the user and their statistics
        games: {
            type: [{
                // The ID of the game
                game_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Game' },
                // The number of times the user has played the game
                games_played: { type: Number, default: 0 },
            }],
            default: []
        }
    }
});

// Generate a random OTP for email verification
userSchema.methods.generateOTP = function () {
    const otp = Math.floor(100000 + Math.random() * 900000);
    this.Otp = otp.toString();
    return otp;
};

// Verify the OTP entered by the user
userSchema.methods.verifyOTP = function (otp) {
    return this.Otp === otp;
};

// Create a model for the user schema
const User = mongoose.model('User', userSchema);

// Export the User model
module.exports = User;
