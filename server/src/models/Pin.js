const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PinSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  image: { type: String, required: true }, // this must match 'image' in seedPins.js
  destination: { type: String },
  category: { type: String },
  postedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  saves: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Pin', PinSchema);
