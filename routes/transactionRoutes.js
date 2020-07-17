const express = require('express');
const transactionController = require('../controllers/transactionController');
const router = express.Router();

router.route('/ios').get(transactionController.getIOs);
router.route('/stats/monthlyTransactions').get(transactionController.getStatsTransaction);

router
  .route('/')
  .get(transactionController.getAllTransactions)
  .post(transactionController.createTransaction);

router
  .route('/:id')
  .get(transactionController.getTransaction)
  .patch(transactionController.updateTransaction)
  .delete(transactionController.deleteTransaction);

module.exports = router;
