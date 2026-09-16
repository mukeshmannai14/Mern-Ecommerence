const express = require("express");

const {
  createOrder,
  getMyOrders,
  getOrderById,
  cancelOrder,
} = require("../controllers/orderController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// ==============================
// Order Routes
// ==============================

// Place a new order
router.post("/", protect, createOrder);

// Get logged-in user's orders
router.get("/my-orders", protect, getMyOrders);

// Cancel an order
router.put("/:id/cancel", protect, cancelOrder);

// Get single order
router.get("/:id", protect, getOrderById);

module.exports = router;