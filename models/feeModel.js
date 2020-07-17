const mongoose = require('mongoose');

const feeSchema = new mongoose.Schema({
  partner: { type: mongoose.Schema.ObjectId },
  name: { type: String },
  type: { type: String },
  percent: { type: Number },
  absolute: { type: Number },
  createdAt: { type: Date, default: Date.now() }
});

const Fee = mongoose.model('Fee_01', feeSchema);

module.exports = Fee;
