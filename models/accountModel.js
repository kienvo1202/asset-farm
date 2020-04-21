const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  farm: { type:  mongoose.Schema.ObjectId, required: true },
  name: { type: String, required: [true, 'Must have name'] },
  type: {
    type: String,
    required: [true, 'Must have card type'],
    enum: {
      values: [
        'income',
        'expense',
        'cash',
        'saving',
        'stock',
        'bond',
        'toy',
        'realEstates'
      ],
      message: 'only certain types allowed'
    }
  },
  balance: { type: Number },
  nativeDebitCredit: {type: Boolean, required: true},
  budget: { type: Number },
  defaultProbability: { type: Number },
  simpleAnnualReturn: { type: Number },
  varAnnualReturn: { type: Number },
  term: { type: Number }, //Months
  income: { type: Number }, //Other income like rent?
  effectiveDate: { type: Date, default: Date.now() },
  createdAt: { type: Date, default: Date.now() },
  deactiveTime: { type: Date }
});

const Account = mongoose.model('Account_1', accountSchema);

module.exports = Account;
