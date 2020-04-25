// const fs = require('fs');
const Account = require('../models/accountModel');
const APIFeatures = require('../utils/APIFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const factory = require('./handlerFactory');
// const multer = require('multer');
// const sharp = require('sharp');

exports.getAllAccounts = factory.getAll(Account);
exports.getAccount = factory.getOne(Account);
exports.createAccount = factory.createOne(Account);
exports.updateAccount = factory.updateOne(Account);
exports.deleteAccount = factory.deleteOne(Account);

exports.getAllAccountAssets = factory.getAll(
  Account.find()
    .where('type')
    .nin(['income', 'expense'])
);
exports.getAllAccountIOs = factory.getAll(
    Account.find()
      .where('type')
      .in(['income', 'expense'])
  );
