const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Product = require('../models/Product'); // Make sure to import Product model

// Add product to cart
router.post('/add', async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    // Find or create the cart
    let cart = await Cart.findOne();
    if (!cart) {
      cart = new Cart({ products: [] });
      await cart.save();
    }

    // Check if product is already in the cart
    const itemIndex = cart.products.findIndex(p => p.productId.toString() === productId);

    if (itemIndex > -1) {
      // Update quantity if product exists
      cart.products[itemIndex].quantity += quantity;
    } else {
      // Add new product to the cart
      cart.products.push({ productId, quantity });
    }

    cart = await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all items in the cart with full product details
router.get('/', async (req, res) => {
  try {
    // Find the cart and populate product details
    const cart = await Cart.findOne().populate('products.productId', 'title price image description');

    // If no cart exists, respond with an empty array
    if (!cart) {
      return res.status(200).json({ products: [] });
    }

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Remove product from cart
router.post('/remove', async (req, res) => {
  const { productId } = req.body;

  try {
    let cart = await Cart.findOne();
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    // Filter out the product to remove
    cart.products = cart.products.filter(item => item.productId.toString() !== productId);
    cart = await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
