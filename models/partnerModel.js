const mongoose = require('mongoose');

const partnerSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Must have name'] },
  vietnameseName: { type: String },
  shortName: { type: String },
  //institutionType: { type: String }, //Bank, Insurance
  website: { type: String },
  address: { type: String },
  createdAt: { type: Date, default: Date.now() }
});

const Partner = mongoose.model('Partner_01', partnerSchema);

module.exports = Partner;
