const express = require('express');
const assetController = require('../controllers/assetController');
const router = express.Router();

router
  .route('/')
  .get(assetController.getAllAssets)
  .post(assetController.createAsset);

router
  .route('/:id')
  .get(assetController.getAsset)
  .patch(assetController.updateAsset)
  .delete(assetController.deleteAsset);

module.exports = router;
