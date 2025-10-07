const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Add a product
router.post('/add', async (req, res) => {
  try {
    const { name, description, price, image, category } = req.body;
    const newProduct = new Product({ name, description, price, image, category });
    await newProduct.save();
    res.status(201).json({ message: 'Product added successfully', product: newProduct });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
