const mongoose = require('mongoose');

const farmSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Must have name'] }
});

const Farm = mongoose.model('Farm', farmSchema);

module.exports = Farm;
