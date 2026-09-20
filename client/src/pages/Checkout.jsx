import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { clearCart } from "../redux/cartSlice";

function Checkout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ========================================
  // PRICE CALCULATIONS
  // ========================================

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const shippingPrice = 0;

  const totalPrice = subtotal + shippingPrice;

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // ========================================
  // HANDLE INPUT CHANGE
  // ========================================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ========================================
  // CREATE MONGODB ORDER
  // ========================================

  const createMongoOrder = async ({
    token,
    orderItems,
    paymentMethod,
    razorpayOrderId = null,
    razorpayPaymentId = null,
  }) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/orders`,
      {
        items: orderItems,
        shippingAddress: formData,
        paymentMethod,
        razorpayOrderId,
        razorpayPaymentId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response;
  };

  // ========================================
  // RAZORPAY PAYMENT
  // ========================================

  const handleRazorpayPayment = async ({
    token,
    orderItems,
  }) => {
    try {
      // Check Razorpay script
      if (!window.Razorpay) {
        setError(
          "Razorpay is not loaded. Please refresh the page and try again."
        );
        setLoading(false);
        return;
      }

      // ========================================
      // 1. CREATE RAZORPAY ORDER
      // ========================================

      const paymentResponse = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/payment/create-order`,
        {
          amount: totalPrice,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!paymentResponse.data.success) {
        setError("Unable to create Razorpay order.");
        setLoading(false);
        return;
      }

      const razorpayOrder = paymentResponse.data.order;

      console.log("RAZORPAY ORDER CREATED:", razorpayOrder);

      // ========================================
      // 2. RAZORPAY CHECKOUT OPTIONS
      // ========================================

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,

        amount: razorpayOrder.amount,

        currency: razorpayOrder.currency || "INR",

        name: "ShopHub",

        description: "ShopHub E-Commerce Order",

        order_id: razorpayOrder.id,

        prefill: {
          name: formData.fullName,
          contact: formData.phone,
        },

        notes: {
          address: formData.address,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
        },

        theme: {
          color: "#4f46e5",
        },

        // ========================================
        // 3. PAYMENT SUCCESS
        // ========================================

        handler: async function (paymentResponse) {
          try {
            console.log(
              "RAZORPAY PAYMENT RESPONSE:",
              paymentResponse
            );

            setLoading(true);
            setError("");

            // ========================================
            // 4. VERIFY PAYMENT
            // ========================================

            const verifyResponse = await axios.post(
              `${import.meta.env.VITE_API_URL}/api/payment/verify`,
              {
                razorpay_order_id:
                  paymentResponse.razorpay_order_id,

                razorpay_payment_id:
                  paymentResponse.razorpay_payment_id,

                razorpay_signature:
                  paymentResponse.razorpay_signature,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            if (!verifyResponse.data.success) {
              setError(
                "Payment verification failed. Your order was not created."
              );
              setLoading(false);
              return;
            }

            console.log("PAYMENT VERIFIED SUCCESSFULLY");

            // ========================================
            // 5. CREATE MONGODB ORDER
            // ========================================

            const orderResponse = await createMongoOrder({
              token,
              orderItems,
              paymentMethod: "RAZORPAY",
              razorpayOrderId:
                paymentResponse.razorpay_order_id,
              razorpayPaymentId:
                paymentResponse.razorpay_payment_id,
            });

            if (!orderResponse.data.success) {
              setError(
                "Payment succeeded but order creation failed. Please contact support."
              );
              setLoading(false);
              return;
            }

            console.log(
              "MONGODB ORDER CREATED:",
              orderResponse.data.order
            );

            // ========================================
            // 6. CLEAR CART
            // ========================================

            dispatch(clearCart());

            // ========================================
            // 7. ORDER SUCCESS PAGE
            // ========================================

            navigate(
              `/order-success/${orderResponse.data.order._id}`
            );
          } catch (error) {
            console.error(
              "PAYMENT VERIFICATION ERROR:",
              error
            );

            setError(
              error.response?.data?.message ||
                "Payment verification failed. Please contact support if money was deducted."
            );
          } finally {
            setLoading(false);
          }
        },

        // ========================================
        // PAYMENT MODAL CLOSED
        // ========================================

        modal: {
          ondismiss: function () {
            console.log("RAZORPAY PAYMENT WINDOW CLOSED");

            setLoading(false);

            setError(
              "Payment was cancelled. You can try again."
            );
          },
        },
      };

      // ========================================
      // 8. CREATE RAZORPAY INSTANCE
      // ========================================

      const razorpay = new window.Razorpay(options);

      // ========================================
      // PAYMENT FAILED
      // ========================================

      razorpay.on("payment.failed", function (response) {
        console.error(
          "RAZORPAY PAYMENT FAILED:",
          response
        );

        setLoading(false);

        setError(
          response.error?.description ||
            "Payment failed. Please try again."
        );
      });

      // ========================================
      // 9. OPEN RAZORPAY POPUP
      // ========================================

      razorpay.open();
    } catch (error) {
      console.error(
        "RAZORPAY CREATE ORDER ERROR:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Unable to start Razorpay payment. Please try again."
      );

      setLoading(false);
    }
  };

  // ========================================
  // PLACE ORDER
  // ========================================

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    setError("");

    const token = localStorage.getItem("token");

    // ========================================
    // CHECK LOGIN
    // ========================================

    if (!token) {
      navigate("/login");
      return;
    }

    // ========================================
    // CHECK CART
    // ========================================

    if (cartItems.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    try {
      setLoading(true);

      // ========================================
      // ORDER ITEMS
      // ========================================

      const orderItems = cartItems.map((item) => ({
        product: item._id,
        quantity: item.quantity,
      }));

      // ========================================
      // RAZORPAY
      // ========================================

      if (paymentMethod === "RAZORPAY") {
        await handleRazorpayPayment({
          token,
          orderItems,
        });

        return;
      }

      // ========================================
      // CASH ON DELIVERY
      // ========================================

      if (paymentMethod === "COD") {
        const response = await createMongoOrder({
          token,
          orderItems,
          paymentMethod: "COD",
        });

        if (response.data.success) {
          // Clear cart only after order creation
          dispatch(clearCart());

          // Navigate to success page
          navigate(
            `/order-success/${response.data.order._id}`
          );
        }
      }
    } catch (error) {
      console.error("ORDER ERROR:", error);

      setError(
        error.response?.data?.message ||
          "Failed to place order. Please try again."
      );
    } finally {
      if (paymentMethod === "COD") {
        setLoading(false);
      }
    }
  };

  // ========================================
  // EMPTY CART
  // ========================================

  if (cartItems.length === 0) {
    return (
      <section className="flex min-h-[75vh] items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-indigo-50">
            <span className="text-5xl">🛒</span>
          </div>

          <h1 className="mt-6 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Your Cart is Empty
          </h1>

          <p className="mt-3 text-sm leading-6 text-gray-600 sm:text-base">
            Add products to your cart before proceeding to
            checkout.
          </p>

          <Link
            to="/products"
            className="mt-7 inline-block rounded-xl bg-indigo-600 px-7 py-3.5 text-sm font-bold text-white transition hover:bg-indigo-700 active:scale-95 sm:text-base"
          >
            Continue Shopping →
          </Link>
        </div>
      </section>
    );
  }

  // ========================================
  // CHECKOUT UI
  // ========================================

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
      {/* Header */}

      <div className="mb-8 sm:mb-10">
        <Link
          to="/cart"
          className="text-sm font-semibold text-indigo-600 transition hover:text-indigo-700"
        >
          ← Back to Cart
        </Link>

        <div className="mt-5">
          <p className="text-sm font-bold uppercase tracking-wider text-indigo-600">
            Secure Checkout
          </p>

          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Checkout
          </h1>

          <p className="mt-2 text-sm text-gray-600 sm:text-base">
            Complete your delivery and payment details.
          </p>
        </div>
      </div>

      {/* Error */}

      {error && (
        <div className="mb-6 flex gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-4 text-sm text-red-700 sm:px-5">
          <span>⚠️</span>

          <p>{error}</p>
        </div>
      )}

      {/* Checkout Grid */}

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Form */}

        <form
          onSubmit={handlePlaceOrder}
          className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6 lg:col-span-2"
        >
          {/* Shipping Information */}

          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-600">
                1
              </div>

              <div>
                <h2 className="text-xl font-extrabold text-gray-900 sm:text-2xl">
                  Shipping Information
                </h2>

                <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                  Where should we deliver your order?
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {/* Full Name */}

              <div className="sm:col-span-2">
                <label
                  htmlFor="fullName"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Full Name
                </label>

                <input
                  id="fullName"
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  autoComplete="name"
                  placeholder="Enter your full name"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 sm:text-base"
                />
              </div>

              {/* Phone */}

              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Phone Number
                </label>

                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  autoComplete="tel"
                  inputMode="numeric"
                  placeholder="Enter phone number"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 sm:text-base"
                />
              </div>

              {/* Pincode */}

              <div>
                <label
                  htmlFor="pincode"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Pincode
                </label>

                <input
                  id="pincode"
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  required
                  autoComplete="postal-code"
                  inputMode="numeric"
                  placeholder="Enter pincode"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 sm:text-base"
                />
              </div>

              {/* Address */}

              <div className="sm:col-span-2">
                <label
                  htmlFor="address"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Address
                </label>

                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  rows="4"
                  autoComplete="street-address"
                  placeholder="House no, street, area..."
                  className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 sm:text-base"
                />
              </div>

              {/* City */}

              <div>
                <label
                  htmlFor="city"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  City
                </label>

                <input
                  id="city"
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  autoComplete="address-level2"
                  placeholder="Enter city"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 sm:text-base"
                />
              </div>

              {/* State */}

              <div>
                <label
                  htmlFor="state"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  State
                </label>

                <input
                  id="state"
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                  autoComplete="address-level1"
                  placeholder="Enter state"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 sm:text-base"
                />
              </div>
            </div>
          </div>

          <div className="my-8 border-t border-gray-200" />

          {/* Payment */}

          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-600">
                2
              </div>

              <div>
                <h2 className="text-xl font-extrabold text-gray-900 sm:text-2xl">
                  Payment Method
                </h2>

                <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                  Choose how you'd like to pay.
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {/* COD */}

              <label
                className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition ${
                  paymentMethod === "COD"
                    ? "border-indigo-600 bg-indigo-50"
                    : "border-gray-300 hover:border-indigo-400"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="COD"
                  checked={paymentMethod === "COD"}
                  onChange={(e) =>
                    setPaymentMethod(e.target.value)
                  }
                  className="mt-1 h-4 w-4 shrink-0 accent-indigo-600"
                />

                <div className="min-w-0">
                  <p className="font-bold text-gray-900">
                    Cash on Delivery
                  </p>

                  <p className="mt-1 text-xs leading-5 text-gray-500 sm:text-sm">
                    Pay when your order arrives.
                  </p>
                </div>

                <span className="ml-auto text-xl">
                  💵
                </span>
              </label>

              {/* Razorpay */}

              <label
                className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition ${
                  paymentMethod === "RAZORPAY"
                    ? "border-indigo-600 bg-indigo-50"
                    : "border-gray-300 hover:border-indigo-400"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="RAZORPAY"
                  checked={paymentMethod === "RAZORPAY"}
                  onChange={(e) =>
                    setPaymentMethod(e.target.value)
                  }
                  className="mt-1 h-4 w-4 shrink-0 accent-indigo-600"
                />

                <div className="min-w-0">
                  <p className="font-bold text-gray-900">
                    Razorpay
                  </p>

                  <p className="mt-1 text-xs leading-5 text-gray-500 sm:text-sm">
                    Pay securely using UPI, Card, Net Banking
                    or Wallet.
                  </p>
                </div>

                <span className="ml-auto text-xl">
                  💳
                </span>
              </label>
            </div>
          </div>

          {/* Place Order */}

          <button
            type="submit"
            disabled={loading}
            className="mt-8 w-full rounded-xl bg-indigo-600 px-6 py-4 text-base font-bold text-white shadow-sm transition hover:bg-indigo-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-gray-400 sm:text-lg"
          >
            {loading
              ? paymentMethod === "RAZORPAY"
                ? "Processing Payment..."
                : "Placing Order..."
              : paymentMethod === "RAZORPAY"
              ? `Pay ₹${totalPrice.toLocaleString("en-IN")}`
              : `Place Order • ₹${totalPrice.toLocaleString(
                  "en-IN"
                )}`}
          </button>

          <p className="mt-4 text-center text-xs leading-5 text-gray-500">
            🔒 Your order information is securely processed.
          </p>
        </form>

        {/* Order Summary */}

        <aside className="lg:col-span-1">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6 lg:sticky lg:top-24">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-extrabold text-gray-900 sm:text-2xl">
                Order Summary
              </h2>

              <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-600">
                {totalItems}{" "}
                {totalItems === 1 ? "item" : "items"}
              </span>
            </div>

            {/* Products */}

            <div className="mt-6 space-y-4">
              {cartItems.map((item) => (
                <div key={item._id} className="flex gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-16 w-16 shrink-0 rounded-xl object-cover sm:h-20 sm:w-20"
                  />

                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-2 text-sm font-bold text-gray-900">
                      {item.name}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      Qty: {item.quantity}
                    </p>

                    <p className="mt-1 text-sm font-semibold text-gray-900">
                      ₹
                      {(
                        item.price * item.quantity
                      ).toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Totals */}

            <div className="my-6 border-t border-gray-200" />

            <div className="space-y-3">
              <div className="flex justify-between text-sm text-gray-600 sm:text-base">
                <span>Subtotal</span>

                <span className="font-semibold text-gray-900">
                  ₹{subtotal.toLocaleString("en-IN")}
                </span>
              </div>

              <div className="flex justify-between text-sm text-gray-600 sm:text-base">
                <span>Shipping</span>

                <span className="font-semibold text-green-600">
                  Free
                </span>
              </div>
            </div>

            <div className="my-6 border-t border-gray-200" />

            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-gray-900">
                Total
              </span>

              <span className="text-2xl font-extrabold text-gray-900">
                ₹{totalPrice.toLocaleString("en-IN")}
              </span>
            </div>

            {/* Secure Info */}

            <div className="mt-6 rounded-xl bg-gray-50 p-4">
              <div className="flex gap-3">
                <span className="text-lg">🔐</span>

                <div>
                  <p className="text-sm font-bold text-gray-900">
                    Secure Checkout
                  </p>

                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    Your personal and order information is
                    protected.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

export default Checkout;