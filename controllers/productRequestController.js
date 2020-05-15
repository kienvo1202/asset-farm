// const fs = require('fs');
const ProductRequest = require('../models/productRequestModel');
const APIFeatures = require('../utils/APIFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const factory = require('./handlerFactory');
// const multer = require('multer');
// const sharp = require('sharp');

exports.getAllProductRequests = factory.getAll(ProductRequest);
exports.getProductRequest = factory.getOne(ProductRequest);
exports.createProductRequest = factory.createOne(ProductRequest);
exports.updateProductRequest = factory.updateOne(ProductRequest);
exports.deleteProductRequest = factory.deleteOne(ProductRequest);
