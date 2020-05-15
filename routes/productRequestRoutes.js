const express = require('express');
const productRequestController = require('../controllers/productRequestController');
const router = express.Router();

router
  .route('/')
  .get(productRequestController.getAllProductRequests)
  .post(productRequestController.createProductRequest);

router
  .route('/:id')
  .get(productRequestController.getProductRequest)
  .patch(productRequestController.updateProductRequest)
  .delete(productRequestController.deleteProductRequest);

module.exports = router;
