const mongoose = require('mongoose');

const accountPlanSchema = new mongoose.Schema({
  //ACCOUNT SPECIFIC
  //farm: { type: mongoose.Schema.ObjectId}, //referred to at farm level
  initializedBalance: { type: Number, default: 0 }, //unnecessary but convenient to convert to account
  

  // GENERIC
  partner: { type: mongoose.Schema.ObjectId }, //partner schema?
  name: { type: String, required: [true, 'Must have name'] },
  type: { type: String, required: [true, 'Must have asset type'] },
  nativeDebitCredit: { type: Boolean, required: true },
  description: { type: String },
  subType: { type: String },
  liquidityScore: { type: Number }, //1-1000 higher better?
  effectiveDate: { type: Date, default: Date.now() },
  createdAt: { type: Date, default: Date.now() },
  deactiveTime: { type: Date },

  // BONDS,TERM SAVING, maybe LOAN
  // defaultProbability: { type: Number },
  simpleAnnualInterest: { type: Number },
  term: { type: Number }, //in months, bonds/saving
  interestPaymentFrequency: { type: Number }, //every x months, bonds/saving
  probabilityOfDefault: { type: Number }, // expected loss = exposure * probs * LGD
  percentLossGivenDefault: { type: Number }, //percent
  //recoveryGivenDefault: { type: Number }, //absolute amount

  // FUND
  fees: [{ type: mongoose.Schema.ObjectId }], //feeSchema?

  // INSURANCE
  premiumPayment: { type: Number },
  premiumDuration:{ type: Number },
  protectionValue: { type: Number },
  protectionDuration: { type: Number },

  // TOYS
  usefulLife: { type: Number },

  // CREDIT CARD, LOAN
  gracePeriod: { type: Number }, //days
  rewardsProgram: [{ type: mongoose.Schema.ObjectId }], //rewardSchema?

  income: { type: Number }, //Other income like rent?

  //DIFFERENCE HERE
  priority: { type: Number }, 
  amount: { type: Number }, 
  fundedBy: [{type:  mongoose.Schema.ObjectId}]
});

const AccountPlan = mongoose.model('AccountPlan_01', accountPlanSchema);

module.exports = AccountPlan;
