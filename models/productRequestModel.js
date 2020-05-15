const mongoose = require('mongoose');

const productRequestSchema = new mongoose.Schema({
  user: { type:  mongoose.Schema.ObjectId, required: true },
  product: { type:  mongoose.Schema.ObjectId, required: true },
  createdAt: { type: Date, default: Date.now() },  
});

const ProductRequest = mongoose.model('Product_Request_01', productRequestSchema);

module.exports = ProductRequest;
