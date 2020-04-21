const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  farm: { type: mongoose.Schema.ObjectId},
  transactionNo: { type: Number},
  debit: { type: mongoose.Schema.ObjectId, required: true },
  credit: { type: mongoose.Schema.ObjectId, required: true },
  amount: { type: Number, required: true },
  debitIsFrom: {type: Boolean, required: true},
  descriptionStandard: { type: mongoose.Schema.ObjectId }, // hidden field, category
  descriptionFree: { type: String},
  effectiveDate: { type: Date, default: Date.now()},
  realized: {type:Boolean}, //to confirm future transactions once due
  createdAt: { type: Date, default: Date.now() }
});

const Transaction = mongoose.model('Transaction_01', transactionSchema);

module.exports = Transaction;
