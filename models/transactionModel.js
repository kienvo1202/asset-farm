const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  farm: { type: mongoose.Schema.ObjectId, ref: 'Farm_02' },
  transactionNo: { type: Number },
  debit: { type: mongoose.Schema.ObjectId, required: true, ref: 'Account_1' },
  credit: { type: mongoose.Schema.ObjectId, required: true, ref: 'Account_1' },
  amount: { type: Number, required: true },
  //debitIsFrom: { type: Boolean, required: true },
  descriptionStandard: { type: mongoose.Schema.ObjectId }, // hidden field, category
  descriptionFree: { type: String },
  effectiveDate: { type: Date, default: Date.now() },
  future: { type: Boolean }, //to confirm future transactions once due
  createdAt: { type: Date, default: Date.now() }
});

transactionSchema.pre(/^find/, function(next) {
  this.populate({ path: 'debit', select: 'type name' })
    .populate({path: 'credit',select: 'type name'});
    //.populate({path: 'farm',select: '_id name'});

  next();
});

const Transaction = mongoose.model('Transaction_01', transactionSchema);
module.exports = Transaction;
