// const fs = require('fs');
const AccountPlan = require('../models/accountPlanModel');
const APIFeatures = require('../utils/APIFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const factory = require('./handlerFactory');
// const multer = require('multer');
// const sharp = require('sharp');

exports.getAllAccountPlans = factory.getAll(AccountPlan);
exports.getAccountPlan = factory.getOne(AccountPlan);
exports.createAccountPlan = factory.createOne(AccountPlan);
exports.updateAccountPlan = factory.updateOne(AccountPlan);
exports.deleteAccountPlan = factory.deleteOne(AccountPlan);

