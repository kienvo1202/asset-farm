// const fs = require('fs');
const Transaction = require('../models/transactionModel');
// const APIFeatures = require('../utils/APIFeatures');
// const catchAsync = require('../utils/catchAsync');
// const AppError = require('../utils/AppError');
const factory = require('./handlerFactory');
// const multer = require('multer');
// const sharp = require('sharp');

exports.getAllTransactions = factory.getAll(Transaction);
exports.getTransaction = factory.getOne(Transaction);
exports.createTransaction = factory.createOne(Transaction);
exports.updateTransaction = factory.updateOne(Transaction);
exports.deleteTransaction = factory.deleteOne(Transaction);
