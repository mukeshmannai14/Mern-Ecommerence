const express = require("express");

const {
  registerUser,
  loginUser,
} = require("../controllers/authController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();


// ========================================
// Public Routes
// ========================================

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);


// ========================================
// Protected Routes
// ========================================

// Get logged-in user's profile
router.get("/profile", protect, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Profile accessed successfully",

    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
    },
  });
});


module.exports = router;