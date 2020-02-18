const express = require('express');
const ioController = require('../controllers/ioController');
const router = express.Router();

router
  .route('/')
  .get(ioController.getAllIOs)
  .post(ioController.createIO);

router
  .route('/:id')
  .get(ioController.getIO)
  .patch(ioController.updateIO)
  .delete(ioController.deleteIO);

module.exports = router;
