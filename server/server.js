const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const app = express();


// ========================================
// Middleware
// ========================================

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

// ========================================
// Routes
// ========================================

app.use("/api/auth", authRoutes);

app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

// ========================================
// Home Route
// ========================================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "E-Commerce API is running",
  });
});


// ========================================
// Start Server
// ========================================

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Wait for MongoDB
    await connectDB();

    // Start Express only after DB connection
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("❌ Failed to start server");
    process.exit(1);
  }
};

startServer();