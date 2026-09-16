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

// ==============================
// Cancel Order
// ==============================

const cancelOrder = async (req, res) => {
  try {
    const { id } = req.params;

    // ==============================
    // Find Order
    // ==============================

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    // ==============================
    // Check Order Ownership
    // ==============================

    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to cancel this order.",
      });
    }

    // ==============================
    // Check Current Status
    // ==============================

    if (order.orderStatus === "Cancelled") {
      return res.status(400).json({
        success: false,
        message: "This order is already cancelled.",
      });
    }

    if (
      order.orderStatus === "Shipped" ||
      order.orderStatus === "Delivered"
    ) {
      return res.status(400).json({
        success: false,
        message: "This order cannot be cancelled after shipping.",
      });
    }

    // ==============================
    // Restore Product Stock
    // ==============================

    for (const item of order.items) {
      await Product.findByIdAndUpdate(
        item.product,
        {
          $inc: {
            stock: item.quantity,
          },
        },
        {
          new: true,
        }
      );
    }

    // ==============================
    // Update Order Status
    // ==============================

    order.orderStatus = "Cancelled";

    // If payment was pending, keep it pending.
    // A real Razorpay refund flow can be added later
    // when actual online payment is integrated.

    await order.save();

    // ==============================
    // Response
    // ==============================

    res.status(200).json({
      success: true,
      message: "Order cancelled successfully.",
      order,
    });
  } catch (error) {
    console.error("Cancel Order Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to cancel order.",
    });
  }
};

// ==============================
// Export Controllers
// ==============================

module.exports = {
  createOrder,
  getMyOrders,
  getOrderById,
  cancelOrder,
};