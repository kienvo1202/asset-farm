const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Must have name'] },
  email: {
    type: String,
    required: [true, 'Must have email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Invalid email...']
  },
  farms: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Farm'
    }
  ]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
