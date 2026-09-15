import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {
    // ==============================
    // Add Product
    // ==============================

    addToCart: (state, action) => {
      const product = action.payload;

      const existingProduct = state.items.find(
        (item) => item._id === product._id
      );

      // Product already exists
      if (existingProduct) {
        // Don't exceed available stock
        if (existingProduct.quantity < product.stock) {
          existingProduct.quantity += 1;
        }
      } else {
        // Add new product only if stock is available
        if (product.stock > 0) {
          state.items.push({
            ...product,
            quantity: 1,
          });
        }
      }
    },

    // ==============================
    // Remove Product
    // ==============================

    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (item) => item._id !== action.payload
      );
    },

    // ==============================
    // Increase Quantity
    // ==============================

    increaseQuantity: (state, action) => {
      const item = state.items.find(
        (item) => item._id === action.payload
      );

      if (item && item.quantity < item.stock) {
        item.quantity += 1;
      }
    },

    // ==============================
    // Decrease Quantity
    // ==============================

    decreaseQuantity: (state, action) => {
      const item = state.items.find(
        (item) => item._id === action.payload
      );

      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },

    // ==============================
    // Clear Cart
    // ==============================

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;