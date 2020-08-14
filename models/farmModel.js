const mongoose = require('mongoose');

const farmSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Must have name'] },
  portfolio: [ {
    type: mongoose.Schema.ObjectId,
    ref: 'AccountPlan_01'
  }],
  averageNetIncomePlan: { type: Number },
  averageNetIncomeDefault: { type: Number },
  createdAt: { type: Date, default: Date.now() }
});

farmSchema.pre(/^find/, function(next) {
  //console.log('111111111',this)
  this.populate({
    path: 'portfolio'
  })
  
  next();
});

const Farm = mongoose.model('Farm_02', farmSchema);
module.exports = Farm;
