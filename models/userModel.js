const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: { type: String, trim: true },
  firstName: { type: String, trim: true },
  lastName: { type: String, trim: true },
  email: {
    type: String,
    required: [true, 'Must have email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Invalid email...']
  },
  googleId: { type: String, unique: true },
  farms: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Farm'
    }
  ]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
