const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profileImage: { type: String },
  savedPins: [{ type: Schema.Types.ObjectId, ref: 'Pin' }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
