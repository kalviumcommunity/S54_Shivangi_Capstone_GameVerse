const mongoose = require('mongoose');
const { Schema } = mongoose;

const messageSchema = new Schema({
  chatroom_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Chatroom', required: true },
  sender: {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    username: { type: String }
  },
  message: { type: String, required: true },
  sent_at: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;