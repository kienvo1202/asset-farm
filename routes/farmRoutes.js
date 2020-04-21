const express = require('express');
const farmController = require('../controllers/farmController');
const router = express.Router();

router
  .route('/')
  .get(farmController.getAllFarms)
  .post(farmController.createFarm);

router
  .route('/:id')
  .get(farmController.getFarm)
  .patch(farmController.updateFarm)
  .delete(farmController.deleteFarm);

module.exports = router;
