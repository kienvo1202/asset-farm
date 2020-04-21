// const fs = require('fs');
const Farm = require('../models/farmModel');
const APIFeatures = require('../utils/APIFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const factory = require('./handlerFactory');
// const multer = require('multer');
// const sharp = require('sharp');

exports.getAllFarms = factory.getAll(Farm);
exports.getFarm = factory.getOne(Farm);
exports.createFarm = factory.createOne(Farm);
exports.updateFarm = factory.updateOne(Farm);
exports.deleteFarm = factory.deleteOne(Farm);
