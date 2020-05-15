const express = require('express');
const transactionController = require('../controllers/transactionController');
const router = express.Router();

router
  .route('/ios')
  .get(transactionController.getIOs)
  
router
  .route('/')
  .get(transactionController.getAllTransactions)
  .post(transactionController.createTransaction);
  
module.exports = router;
