const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  farm: {
    type: mongoose.Schema.ObjectId,
    ref: 'Farm'
  },
  card: {
    type: String,
    required: [true, 'Must have card type'],
    enum: {
      values: ['income', 'expense', 'asset'],
      message: 'only 3 card types allowed'
    }
  },
  name: { type: String, required: [true, 'Must have name'] },
  type: { type: String },
  roc: { type: Number },
  balance: { type: Number },
  defaultProbability: { type: Number },
  meanGrowth: { type: Number },
  varGrowth: { type: Number },
  term: { type: Number },
  termUnit: {
    type: String,
    enum: {
      values: ['month', 'year'],
      message: 'only m/y'
    }
  },
  effectiveDate: { type: Date },
  createdAt: { type: Date, default: Date.now() }
});

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;
