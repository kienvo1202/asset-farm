const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  farm: {
    type: mongoose.Schema.ObjectId,
    ref: 'Farm'
  },
  from: { type: String },
  to: { type: String },
  amount: { type: Number },
  description: { type: String },
  effectiveDate: { type: Date, default: Date.now() },
  createdAt: { type: Date, default: Date.now() }
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
