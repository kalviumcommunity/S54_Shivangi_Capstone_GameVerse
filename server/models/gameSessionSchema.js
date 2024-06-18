const mongoose = require('mongoose');
const { Schema } = mongoose;

const gameSessionSchema = new Schema({
  game_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Game', required: true },
  game_title: { type: String },
  started_at: { type: Date, default: Date.now },
  ended_at: { type: Date },
  players: [
    {
      user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      username: { type: String },
      score: { type: Number },
      won: { type: Boolean }
    }
  ]
});

const GameSession = mongoose.model('GameSession', gameSessionSchema);
module.exports = GameSession;