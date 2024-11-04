const express = require('express');
const router = express.Router();
const Wishlist = require('../models/Wishlist');
const Product = require('../models/Product'); // Import the Product model

// Get wishlist items with full product details
router.get('/', async (req, res) => {
  try {
    // Find the wishlist and populate product details
    const wishlist = await Wishlist.findOne().populate('products.productId', 'title price image description');

    // If no wishlist exists, respond with an empty array
    if (!wishlist) {
      return res.status(200).json({ products: [] });
    }

    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add product to wishlist
router.post('/add', async (req, res) => {
  const { productId } = req.body;

  try {
    // Find or create the wishlist
    let wishlist = await Wishlist.findOne();
    if (!wishlist) {
      wishlist = new Wishlist({ products: [] });
      await wishlist.save();
    }

    // Check if the product is already in the wishlist
    if (!wishlist.products.some(p => p.productId.toString() === productId)) {
      wishlist.products.push({ productId });
    }

    wishlist = await wishlist.save();
    res.json(wishlist);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Remove product from wishlist
router.post('/remove', async (req, res) => {
  const { productId } = req.body;

  try {
    let wishlist = await Wishlist.findOne();
    if (!wishlist) return res.status(404).json({ message: 'Wishlist not found' });

    // Filter out the product to remove
    wishlist.products = wishlist.products.filter(item => item.productId.toString() !== productId);
    wishlist = await wishlist.save();
    res.json(wishlist);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
