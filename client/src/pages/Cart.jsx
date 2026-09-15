import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../redux/cartSlice";

function Cart() {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  /* =========================
     EMPTY CART
  ========================== */

  if (cartItems.length === 0) {
    return (
      <section className="flex min-h-[75vh] items-center justify-center px-4 py-10 sm:px-6">
        <div className="w-full max-w-md text-center">

          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-indigo-50">
            <span className="text-5xl">🛒</span>
          </div>

          <h1 className="mt-6 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Your Cart is Empty
          </h1>

          <p className="mt-3 text-sm leading-6 text-gray-600 sm:text-base">
            Looks like you haven't added anything to your cart yet.
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

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">

      {/* =========================
          HEADER
      ========================== */}

      <div className="mb-8 sm:mb-10">

        <p className="text-sm font-bold uppercase tracking-wider text-indigo-600">
          Your Shopping Bag
        </p>

        <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">

          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Shopping Cart
            </h1>

            <p className="mt-2 text-sm text-gray-600 sm:text-base">
              {totalItems}{" "}
              {totalItems === 1 ? "item" : "items"} in your cart
            </p>
          </div>

          <Link
            to="/products"
            className="w-fit text-sm font-semibold text-indigo-600 transition hover:text-indigo-700"
          >
            ← Continue Shopping
          </Link>

        </div>
      </div>

      {/* =========================
          CART + SUMMARY
      ========================== */}

      <div className="grid gap-8 lg:grid-cols-3">

        {/* =========================
            CART ITEMS
        ========================== */}

        <div className="space-y-4 lg:col-span-2">

          {cartItems.map((item) => (
            <div
              key={item._id}
              className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5"
            >

              {/* Mobile / Tablet Layout */}
              <div className="flex flex-col gap-4 sm:flex-row">

                {/* Product Image */}
                <Link
                  to={`/products/${item._id}`}
                  className="shrink-0"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-48 w-full rounded-xl object-cover sm:h-28 sm:w-28"
                  />
                </Link>

                {/* Product Details */}
                <div className="flex min-w-0 flex-1 flex-col">

                  <div className="flex items-start justify-between gap-4">

                    <div className="min-w-0">

                      <p className="text-xs font-bold uppercase tracking-wide text-indigo-600">
                        {item.category}
                      </p>

                      <Link to={`/products/${item._id}`}>
                        <h2 className="mt-1 line-clamp-2 text-base font-bold text-gray-900 transition hover:text-indigo-600 sm:text-lg">
                          {item.name}
                        </h2>
                      </Link>

                      <p className="mt-1 text-sm text-gray-600">
                        ₹{item.price.toLocaleString("en-IN")} each
                      </p>

                    </div>

                    {/* Remove - Desktop */}
                    <button
                      type="button"
                      onClick={() => dispatch(removeFromCart(item._id))}
                      className="hidden shrink-0 text-sm font-semibold text-red-600 transition hover:text-red-700 sm:block"
                    >
                      Remove
                    </button>

                  </div>

                  {/* Bottom Controls */}
                  <div className="mt-4 flex flex-col gap-4 border-t border-gray-100 pt-4 sm:mt-auto sm:flex-row sm:items-end sm:justify-between sm:border-0 sm:pt-4">

                    {/* Quantity */}
                    <div>

                      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Quantity
                      </p>

                      <div className="flex w-fit items-center overflow-hidden rounded-lg border border-gray-300">

                        <button
                          type="button"
                          onClick={() =>
                            dispatch(decreaseQuantity(item._id))
                          }
                          disabled={item.quantity <= 1}
                          aria-label={`Decrease ${item.name} quantity`}
                          className="flex h-10 w-10 items-center justify-center text-xl font-bold text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          −
                        </button>

                        <span className="flex h-10 min-w-10 items-center justify-center border-x border-gray-300 px-3 text-sm font-bold text-gray-900">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            dispatch(increaseQuantity(item._id))
                          }
                          disabled={item.quantity >= item.stock}
                          aria-label={`Increase ${item.name} quantity`}
                          className="flex h-10 w-10 items-center justify-center text-xl font-bold text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          +
                        </button>

                      </div>

                      <p className="mt-2 text-xs text-gray-500">
                        {item.stock} available
                      </p>

                    </div>

                    {/* Item Total */}
                    <div className="text-left sm:text-right">

                      <p className="text-xs font-medium text-gray-500">
                        Item Total
                      </p>

                      <p className="mt-1 text-xl font-extrabold text-gray-900">
                        ₹
                        {(item.price * item.quantity).toLocaleString(
                          "en-IN"
                        )}
                      </p>

                    </div>

                  </div>

                  {/* Mobile Remove */}
                  <button
                    type="button"
                    onClick={() => dispatch(removeFromCart(item._id))}
                    className="mt-3 w-fit text-sm font-semibold text-red-600 transition hover:text-red-700 sm:hidden"
                  >
                    Remove item
                  </button>

                  {/* Maximum Stock Message */}
                  {item.quantity >= item.stock && (
                    <p className="mt-3 rounded-lg bg-orange-50 px-3 py-2 text-xs font-semibold text-orange-600">
                      Maximum available stock reached.
                    </p>
                  )}

                </div>

              </div>
            </div>
          ))}

        </div>

        {/* =========================
            ORDER SUMMARY
        ========================== */}

        <div className="lg:col-span-1">

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6 lg:sticky lg:top-24">

            <h2 className="text-xl font-extrabold text-gray-900 sm:text-2xl">
              Order Summary
            </h2>

            <div className="mt-6 space-y-4">

              <div className="flex items-center justify-between text-sm text-gray-600 sm:text-base">
                <span>
                  Subtotal ({totalItems}{" "}
                  {totalItems === 1 ? "item" : "items"})
                </span>

                <span className="font-semibold text-gray-900">
                  ₹{subtotal.toLocaleString("en-IN")}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-600 sm:text-base">
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
                ₹{subtotal.toLocaleString("en-IN")}
              </span>

            </div>

            <Link
              to="/checkout"
              className="mt-6 block w-full rounded-xl bg-indigo-600 px-6 py-4 text-center text-sm font-bold text-white shadow-sm transition hover:bg-indigo-700 active:scale-[0.98] sm:text-base"
            >
              Proceed to Checkout →
            </Link>

            <div className="mt-5 rounded-xl bg-gray-50 p-4">

              <div className="flex gap-3">
                <span className="text-lg">🔒</span>

                <div>
                  <p className="text-sm font-bold text-gray-900">
                    Secure Checkout
                  </p>

                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    Your order information is securely processed.
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Cart;