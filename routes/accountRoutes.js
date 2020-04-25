const express = require('express');
const accountController = require('../controllers/accountController');
const router = express.Router();

router
  .route('/')
  .get(accountController.getAllAccounts)
  .post(accountController.createAccount);

router.route('/assets').get(accountController.getAllAccountAssets);
router.route('/ios').get(accountController.getAllAccountIOs);

router
  .route('/:id')
  .get(accountController.getAccount)
  .patch(accountController.updateAccount)
  .delete(accountController.deleteAccount);

module.exports = router;
