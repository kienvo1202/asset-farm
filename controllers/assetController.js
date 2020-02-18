// const fs = require('fs');
const Asset = require('../models/assetModel');
const APIFeatures = require('../utils/APIFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const factory = require('./handlerFactory');
// const multer = require('multer');
// const sharp = require('sharp');

exports.getAllAssets = factory.getAll(Asset);
exports.getAsset = factory.getOne(Asset);
exports.createAsset = factory.createOne(Asset);
exports.updateAsset = factory.updateOne(Asset);
exports.deleteAsset = factory.deleteOne(Asset);
