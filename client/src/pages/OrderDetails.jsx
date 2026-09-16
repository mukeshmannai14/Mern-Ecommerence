import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/login");
          return;
        }

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/orders/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setOrder(response.data.order);
      } catch (error) {
        console.error("FETCH ORDER ERROR:", error);

        setError(
          error.response?.data?.message ||
            "Failed to load order."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id, navigate]);

  /* =========================
     CANCEL ORDER
  ========================== */

  const handleCancelOrder = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this order?"
    );

    if (!confirmed) return;

    try {
      setCancelling(true);
      setError("");
      setMessage("");

      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/orders/${id}/cancel`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrder(response.data.order);
      setMessage("Order cancelled successfully.");
    } catch (error) {
      console.error("CANCEL ORDER ERROR:", error);

      setError(
        error.response?.data?.message ||
          "Failed to cancel order."
      );
    } finally {
      setCancelling(false);
    }
  };

  /* =========================
     LOADING
  ========================== */

  if (loading) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="animate-pulse">
          <div className="h-5 w-36 rounded bg-gray-200" />

          <div className="mt-8 h-10 w-60 rounded bg-gray-200" />

          <div className="mt-10 h-48 rounded-2xl bg-gray-100" />

          <div className="mt-8 grid gap-8 lg:grid-cols-3">
            <div className="h-80 rounded-2xl bg-gray-100 lg:col-span-2" />
            <div className="h-80 rounded-2xl bg-gray-100" />
          </div>
        </div>
      </section>
    );
  }

  /* =========================
     ERROR
  ========================== */

  if (error && !order) {
    return (
      <section className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <div className="text-5xl">📦</div>

        <h1 className="mt-5 text-2xl font-bold text-gray-900 sm:text-3xl">
          Order Not Found
        </h1>

        <p className="mt-2 text-sm text-red-600">
          {error}
        </p>

        <Link
          to="/orders"
          className="mt-6 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-indigo-700"
        >
          ← Back to My Orders
        </Link>
      </section>
    );
  }

  if (!order) {
    return null;
  }

  const statuses = [
    "Processing",
    "Confirmed",
    "Shipped",
    "Delivered",
  ];

  const currentStatusIndex = statuses.indexOf(
    order.orderStatus
  );

  const statusStyles =
    order.orderStatus === "Delivered"
      ? "bg-green-100 text-green-700"
      : order.orderStatus === "Cancelled"
      ? "bg-red-100 text-red-700"
      : "bg-yellow-100 text-yellow-700";

  /*
    Customer can cancel only while the order
    is Processing or Confirmed.
  */

  const canCancel =
    order.orderStatus === "Processing" ||
    order.orderStatus === "Confirmed";

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
      {/* Back */}

      <Link
        to="/orders"
        className="text-sm font-semibold text-indigo-600 transition hover:text-indigo-700"
      >
        ← Back to My Orders
      </Link>

      {/* Header */}

      <div className="mt-6 flex flex-col gap-4 sm:mt-8 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <p className="text-sm font-bold uppercase tracking-wider text-indigo-600">
            Order Information
          </p>

          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Order Details
          </h1>

          <p className="mt-2 break-all text-xs text-gray-500 sm:text-sm">
            Order ID: {order._id}
          </p>
        </div>

        <span
          className={`w-fit rounded-full px-4 py-2 text-xs font-bold sm:text-sm ${statusStyles}`}
        >
          {order.orderStatus}
        </span>
      </div>

      {/* Success Message */}

      {message && (
        <div className="mt-6 flex gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-4 text-sm text-green-700">
          <span>✓</span>

          <p>{message}</p>
        </div>
      )}

      {/* Error Message */}

      {error && order && (
        <div className="mt-6 flex gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-4 text-sm text-red-700">
          <span>⚠️</span>

          <p>{error}</p>
        </div>
      )}

      {/* Tracking */}

      {order.orderStatus !== "Cancelled" && (
        <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:mt-10 sm:p-6">
          <h2 className="text-xl font-extrabold text-gray-900 sm:text-2xl">
            Order Tracking
          </h2>

          <div className="mt-8 space-y-6 sm:grid sm:grid-cols-4 sm:gap-4 sm:space-y-0">
            {statuses.map((status, index) => {
              const completed =
                index <= currentStatusIndex;

              return (
                <div
                  key={status}
                  className="flex items-center gap-4 sm:flex-col sm:text-center"
                >
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                      completed
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {completed ? "✓" : index + 1}
                  </div>

                  <div>
                    <p
                      className={`text-sm font-bold ${
                        completed
                          ? "text-indigo-600"
                          : "text-gray-500"
                      }`}
                    >
                      {status}
                    </p>

                    {index === currentStatusIndex && (
                      <p className="mt-1 text-xs text-gray-500">
                        Current status
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Cancelled */}

      {order.orderStatus === "Cancelled" && (
        <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-5 sm:mt-10 sm:p-6">
          <h2 className="text-xl font-bold text-red-700">
            Order Cancelled
          </h2>

          <p className="mt-2 text-sm leading-6 text-red-600">
            This order has been cancelled and the product
            stock has been restored.
          </p>
        </div>
      )}

      {/* Products + Summary */}

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        {/* Products */}

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6 lg:col-span-2">
          <h2 className="text-xl font-extrabold text-gray-900 sm:text-2xl">
            Ordered Products
          </h2>

          <div className="mt-6 space-y-5">
            {order.items.map((item, index) => (
              <div
                key={`${order._id}-${index}`}
                className="flex gap-3 border-b border-gray-100 pb-5 last:border-b-0 last:pb-0 sm:gap-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-20 w-20 shrink-0 rounded-xl object-cover sm:h-24 sm:w-24"
                />

                <div className="min-w-0 flex-1">
                  <h3 className="line-clamp-2 text-sm font-bold text-gray-900 sm:text-base">
                    {item.name}
                  </h3>

                  <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                    Quantity: {item.quantity}
                  </p>

                  <p className="mt-1 text-xs text-gray-600 sm:text-sm">
                    ₹{item.price.toLocaleString("en-IN")} each
                  </p>
                </div>

                <p className="shrink-0 text-sm font-bold text-gray-900 sm:text-base">
                  ₹
                  {(item.price * item.quantity).toLocaleString(
                    "en-IN"
                  )}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}

        <div className="h-fit rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6 lg:sticky lg:top-24">
          <h2 className="text-xl font-extrabold text-gray-900 sm:text-2xl">
            Order Summary
          </h2>

          <div className="mt-6 space-y-4">
            <div className="flex justify-between text-sm text-gray-600 sm:text-base">
              <span>Subtotal</span>

              <span className="font-semibold text-gray-900">
                ₹{order.subtotal.toLocaleString("en-IN")}
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

          <div className="flex justify-between">
            <span className="text-lg font-bold text-gray-900">
              Total
            </span>

            <span className="text-xl font-extrabold text-gray-900 sm:text-2xl">
              ₹{order.totalPrice.toLocaleString("en-IN")}
            </span>
          </div>

          <div className="mt-6 rounded-xl bg-gray-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              Payment Method
            </p>

            <p className="mt-1 text-sm font-bold text-gray-900">
              {order.paymentMethod}
            </p>

            <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
              Payment Status
            </p>

            <p className="mt-1 text-sm font-bold text-gray-900">
              {order.paymentStatus}
            </p>
          </div>

          {/* Cancel Button */}

          {canCancel && (
            <button
              type="button"
              onClick={handleCancelOrder}
              disabled={cancelling}
              className="mt-5 w-full rounded-xl border border-red-200 bg-red-50 px-5 py-3.5 text-sm font-bold text-red-600 transition hover:bg-red-100 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {cancelling
                ? "Cancelling..."
                : "Cancel Order"}
            </button>
          )}
        </div>
      </div>

      {/* Shipping Address */}

      <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
        <h2 className="text-xl font-extrabold text-gray-900 sm:text-2xl">
          Shipping Address
        </h2>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              Full Name
            </p>

            <p className="mt-1 text-sm font-semibold text-gray-900 sm:text-base">
              {order.shippingAddress.fullName}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              Phone
            </p>

            <p className="mt-1 text-sm font-semibold text-gray-900 sm:text-base">
              {order.shippingAddress.phone}
            </p>
          </div>

          <div className="sm:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              Address
            </p>

            <p className="mt-1 text-sm font-semibold leading-6 text-gray-900 sm:text-base">
              {order.shippingAddress.address}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              City
            </p>

            <p className="mt-1 text-sm font-semibold text-gray-900 sm:text-base">
              {order.shippingAddress.city}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              State
            </p>

            <p className="mt-1 text-sm font-semibold text-gray-900 sm:text-base">
              {order.shippingAddress.state}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              Pincode
            </p>

            <p className="mt-1 text-sm font-semibold text-gray-900 sm:text-base">
              {order.shippingAddress.pincode}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OrderDetails;