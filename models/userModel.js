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
      ref: 'Farm_02'
    }
  ]
});

//DOCUMENT MIDDLEWARE, run before save(), create()

//QUERY MIDDLEWARE, run before query
userSchema.pre(/^find/, function(next) {
  // this.populate({
  //   path: 'farms',
  //   select: '-__v'
  // });
  //console.log("middleware user pop")
  next();
});

//AGGREGATE MIDDLEWARE, before aggregate

const User = mongoose.model('User', userSchema);

module.exports = User;
