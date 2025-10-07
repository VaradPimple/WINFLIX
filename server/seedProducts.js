const mongoose = require('mongoose');
const Product = require('./models/Product');
const connectDB = require('./config');

const products = [
  {
    name: "Smartphone X1",
    description: "Latest smartphone with amazing features",
    price: 699,
    image: "https://via.placeholder.com/150",
    category: "Electronics"
  },
  {
    name: "Gaming Laptop Pro",
    description: "High-performance laptop for gaming",
    price: 1299,
    image: "https://via.placeholder.com/150",
    category: "Electronics"
  },
  {
    name: "Wireless Headphones",
    description: "Noise-cancelling over-ear headphones",
    price: 199,
    image: "https://via.placeholder.com/150",
    category: "Electronics"
  },
  {
    name: "Men's T-Shirt",
    description: "Comfortable cotton t-shirt",
    price: 25,
    image: "https://via.placeholder.com/150",
    category: "Clothing"
  },
  {
    name: "Women's Dress",
    description: "Elegant summer dress",
    price: 45,
    image: "https://via.placeholder.com/150",
    category: "Clothing"
  },
  {
    name: "Coffee Maker",
    description: "Brew coffee like a barista",
    price: 99,
    image: "https://via.placeholder.com/150",
    category: "Home Appliances"
  },
  {
    name: "Action Camera",
    description: "Capture adventures in 4K",
    price: 299,
    image: "https://via.placeholder.com/150",
    category: "Electronics"
  },
  {
    name: "Running Shoes",
    description: "Comfortable and stylish running shoes",
    price: 89,
    image: "https://via.placeholder.com/150",
    category: "Footwear"
  }
];

const seedDB = async () => {
  try {
    await connectDB();
    await Product.deleteMany(); // Clears old products
    await Product.insertMany(products);
    console.log('Products seeded successfully');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedDB();
