const express = require('express');
const accountPlanController = require('../controllers/accountPlanController');
const router = express.Router();

router
  .route('/')
  .get(accountPlanController.getAllAccountPlans)
  .post(accountPlanController.createAccountPlan);

router
  .route('/:id')
  .get(accountPlanController.getAccountPlan)
  .patch(accountPlanController.updateAccountPlan)
  .delete(accountPlanController.deleteAccountPlan);

module.exports = router;
