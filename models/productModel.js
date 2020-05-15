const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  partner: { type: mongoose.Schema.ObjectId, required: true },
  name: { type: String, required: [true, 'Must have name'] },
  //generalType: { type: String, required: [true, 'Must have asset type']},
  type: { type: String, required: [true, 'Must have asset type'] },
  //subType: { type: String, required: [true, 'Must have asset type']},
  minimumBalance: { type: Number }, //cash, saving
  nativeDebitCredit: { type: Boolean, required: true },
  liquidityScore: { type: Number }, //1-1000 higher better?
  defaultProbability: { type: Number }, // bonds/saving
  simpleAnnualInterest: { type: Number }, // bonds/saving, or loans/credit card
  term: { type: Number }, //Months, bonds/saving or loans
  interestPaymentFrequency: { type: Number }, //Every x Months, bonds/saving 
  insuranceType: { type: String }, // insurance 3,000,000
  premiumPayment: { type: Number }, // insurance 3,000,000
  protectionValue: { type: Number }, // insurance 2,000,000,000, saving interest 7m/month
  fees: { type: Number }, //card, maintenance 900,000
  gracePeriod: { type: Number }, //card, days 45,55
  usefulLife: { type: Number }, //toys
  otherReturn: { type: Number }, //Other income like rent?
  effectiveDate: { type: Date, default: Date.now() },
  createdAt: { type: Date, default: Date.now() },
  deactiveTime: { type: Date }
});

const Product = mongoose.model('Product_01', productSchema);

module.exports = Product;
