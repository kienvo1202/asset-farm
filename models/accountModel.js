const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  farm: { type:  mongoose.Schema.ObjectId, required: true },
  name: { type: String, required: [true, 'Must have name'] },
  type: { type: String, required: [true, 'Must have asset type']},
  initializedBalance: { type: Number, default: 0 },
  nativeDebitCredit: {type: Boolean, required: true},
  budget: { type: Number },
  liquidityScore: { type: Number },//1-1000 higher better?
  defaultProbability: { type: Number }, // bonds/saving
  simpleAnnualReturn: { type: Number }, // bonds/saving
  premiumPayment: { type: Number }, // insurance
  protectionValue: { type: Number }, // insurance  
  term: { type: Number }, //Months, bonds/saving
  usefulLife: { type: Number }, //toys
  income: { type: Number }, //Other income like rent?
  effectiveDate: { type: Date, default: Date.now() },
  createdAt: { type: Date, default: Date.now() },
  deactiveTime: { type: Date }
});

const Account = mongoose.model('Account_1', accountSchema);

module.exports = Account;
