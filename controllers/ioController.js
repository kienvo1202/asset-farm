// const fs = require('fs');
const IO = require('../models/ioModel');
const APIFeatures = require('../utils/APIFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const factory = require('./handlerFactory');
// const multer = require('multer');
// const sharp = require('sharp');

exports.getAllIOs = factory.getAll(IO);
exports.getIO = factory.getOne(IO);
exports.createIO = factory.createOne(IO);
exports.updateIO = factory.updateOne(IO);
exports.deleteIO = factory.deleteOne(IO);
