const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CollectionSchema = new Schema({
  name: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  pins: [{ type: Schema.Types.ObjectId, ref: 'Pin' }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Collection', CollectionSchema);
