const mongoose = require('mongoose');
const { Schema } = mongoose;

const chatroomSchema = new Schema({
    name: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    created_by: {
        user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        username: { type: String }
    },
    participants: [
        {
            user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            username: { type: String }
        }
    ]
});

const Chatroom = mongoose.model('Chatroom', chatroomSchema);
module.exports = Chatroom;
