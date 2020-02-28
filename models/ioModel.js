const mongoose = require('mongoose');

const ioSchema = new mongoose.Schema({
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
      values: ['income','expense'],
      message: 'only certain types allowed'
    }
  },
  amount: { type: Number},
  budget: { type: Number },
  effectiveDate: { type: Date,default: Date.now() },
  createdAt: {type: Date, default: Date.now()},
  deactiveTime: {type: Date},
});

const IO = mongoose.model('IO_01', ioSchema);

module.exports = IO;
