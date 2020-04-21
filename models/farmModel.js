const mongoose = require('mongoose');

const farmSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Must have name'] },
  createdAt: { type: Date, default: Date.now() }
});

const Farm = mongoose.model('Farm_02', farmSchema);

module.exports = Farm;
