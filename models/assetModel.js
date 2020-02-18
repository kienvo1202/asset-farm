const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema({
  farm: {
    type: mongoose.Schema.ObjectId,
    required:true,
    ref: 'Farm'
  },
  name: { type: String, required: [true, 'Must have name'] },
  type: {
    type: String,
    required: [true, 'Must have card type'],
    enum: {
      values: ['cash', 'saving', 'stock', 'bond', 'toy','realEstates'],
      message: 'only certain types allowed'
    }
  },
  balance: { type: Number },
  defaultProbability: { type: Number },
  simpleAnnualReturn: { type: Number },
  varAnnualReturn: { type: Number },
  term: { type: Number }, //Months
  income: { type: Number }, //Other income like rent?
  effectiveDate: { type: Date,default: Date.now() },
  createdAt: {type: Date, default: Date.now()},
  deactiveTime: {type: Date},
});

const Asset = mongoose.model('Asset_01', assetSchema);

module.exports = Asset;
