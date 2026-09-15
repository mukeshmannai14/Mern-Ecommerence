const Order = require("../models/Order");
const Product = require("../models/Product");

// ==============================
// Create Order
// ==============================

const createOrder = async (req, res) => {
  try {
    const {
      items,
      shippingAddress,
      paymentMethod,
    } = req.body;

    // ==============================
    // Validate Request
    // ==============================

    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Your cart is empty.",
      });
    }

    if (!shippingAddress) {
      return res.status(400).json({
        success: false,
        message: "Shipping address is required.",
      });
    }

    // ==============================
    // Prepare Order Items
    // ==============================

    const orderItems = [];

    let subtotal = 0;

    // ==============================
    // Check Products & Stock
    // ==============================

    for (const item of items) {
      const product = await Product.findById(item.product);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product not found: ${item.product}`,
        });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Not enough stock for ${product.name}. Available stock: ${product.stock}`,
        });
      }

      const itemTotal = product.price * item.quantity;

      subtotal += itemTotal;

      orderItems.push({
        product: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        quantity: item.quantity,
      });
    }

    // ==============================
    // Shipping
    // ==============================

    const shippingPrice = 0;

    const totalPrice = subtotal + shippingPrice;

    // ==============================
    // Create Order
    // ==============================

    const order = await Order.create({
      user: req.user._id,

      items: orderItems,

      shippingAddress,

      paymentMethod: paymentMethod || "COD",

      paymentStatus: "Pending",

      orderStatus: "Processing",

      subtotal,

      shippingPrice,

      totalPrice,
    });

    // ==============================
    // Reduce Product Stock
    // ==============================

    for (const item of items) {
      await Product.findByIdAndUpdate(
        item.product,
        {
          $inc: {
            stock: -item.quantity,
          },
        },
        {
          new: true,
        }
      );
    }

    // ==============================
    // Response
    // ==============================

    res.status(201).json({
      success: true,
      message: "Order placed successfully.",
      order,
    });
  } catch (error) {
    console.error("Create Order Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create order.",
    });
  }
};

// ==============================
// Get My Orders
// ==============================

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user._id,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error("Get My Orders Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch orders.",
    });
  }
};

// ==============================
// Get Single Order
// ==============================

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    // Make sure the user owns this order
    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to view this order.",
      });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Get Order Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch order.",
    });
  }
};

module.exports = {
  createOrder,
  getMyOrders,
  getOrderById,
};