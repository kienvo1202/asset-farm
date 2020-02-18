const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  farm: { type: mongoose.Schema.ObjectId, required: true, ref: 'Farm' },
  from: { type: String, required: true },
  to: { type: String, required: true },
  amount: { type: Number, required: true },
  descriptionStandard: { type: mongoose.Schema.ObjectId }, // hidden field
  descriptionFree: { type: String },
  effectiveDate: { type: Date, default: Date.now() },
  createdAt: { type: Date, default: Date.now() }
});

const Transaction = mongoose.model('Transaction_01', transactionSchema);

module.exports = Transaction;
