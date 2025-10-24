const express = require("express");
const cors = require("cors");
const connectDB = require("./config");
const User = require("./models/User");
require("dotenv").config(); // load environment variables

// Routes
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/users"); // user profile routes

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*'  // allow requests from any domain
}));
app.use(express.json());

// Connect to MongoDB using environment variable
connectDB(process.env.DB_URL); // make sure your connectDB function accepts a URL parameter

// API routes
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("WinFlix backend is working!");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
