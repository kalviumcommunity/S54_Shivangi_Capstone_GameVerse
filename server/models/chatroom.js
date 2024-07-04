const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the schema for a chatroom
const chatroomSchema = new Schema({
    // The name of the chatroom
    name: { type: String, required: true },
    // The date and time when the chatroom was created
    created_at: { type: Date, default: Date.now },
    // The user who created the chatroom
    created_by: {
        // The ID of the user who created the chatroom
        user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        // The username of the user who created the chatroom
        username: { type: String }
    },
    // The participants in the chatroom
    participants: [
        // The ID and username of each participant in the chatroom
        {
            user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            username: { type: String }
        }
    ]
});

// Create a model for the chatroom schema
const Chatroom = mongoose.model('Chatroom', chatroomSchema);

// Export the Chatroom model
module.exports = Chatroom;

