const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',  // Reference to the Product model
        required: true
      },
      quantity: { 
        type: Number, 
        default: 1 
      },
    },
  ],
});

module.exports = mongoose.model('Cart', CartSchema);
