import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Orders() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/login");
          return;
        }

        const response = await axios.get(
          "http://localhost:5000/api/orders/my-orders",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setOrders(response.data.orders || []);
      } catch (error) {
        console.error("FETCH ORDERS ERROR:", error);

        setError(
          error.response?.data?.message ||
            "Failed to load your orders."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [navigate]);

  /* =========================
     LOADING
  ========================== */

  if (loading) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="animate-pulse">
          <div className="h-10 w-52 rounded-lg bg-gray-200" />

          <div className="mt-3 h-5 w-80 max-w-full rounded bg-gray-100" />

          <div className="mt-10 space-y-5">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-72 rounded-2xl bg-gray-100"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  /* =========================
     ERROR
  ========================== */

  if (error) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center px-4 text-center">
        <div>
          <div className="text-5xl">⚠️</div>

          <h1 className="mt-5 text-2xl font-bold text-gray-900">
            Unable to Load Orders
          </h1>

          <p className="mt-2 text-sm text-red-600">
            {error}
          </p>

          <Link
            to="/products"
            className="mt-6 inline-block rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-indigo-700"
          >
            Continue Shopping
          </Link>
        </div>
      </section>
    );
  }

  /* =========================
     EMPTY
  ========================== */

  if (orders.length === 0) {
    return (
      <section className="flex min-h-[75vh] items-center justify-center px-4">
        <div className="w-full max-w-md text-center">

          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-indigo-50">
            <span className="text-5xl">📦</span>
          </div>

          <h1 className="mt-6 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            No Orders Yet
          </h1>

          <p className="mt-3 text-sm leading-6 text-gray-600 sm:text-base">
            Your orders will appear here after you make a purchase.
          </p>

          <Link
            to="/products"
            className="mt-7 inline-block rounded-xl bg-indigo-600 px-7 py-3.5 text-sm font-bold text-white transition hover:bg-indigo-700 active:scale-95 sm:text-base"
          >
            Start Shopping →
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
          Purchase History
        </p>

        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          My Orders
        </h1>

        <p className="mt-2 text-sm text-gray-600 sm:text-base">
          View and track your previous orders.
        </p>

      </div>

      {/* =========================
          ORDERS
      ========================== */}

      <div className="space-y-5 sm:space-y-6">

        {orders.map((order) => {

          const statusStyles =
            order.orderStatus === "Delivered"
              ? "bg-green-100 text-green-700"
              : order.orderStatus === "Cancelled"
              ? "bg-red-100 text-red-700"
              : "bg-yellow-100 text-yellow-700";

          return (
            <article
              key={order._id}
              className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
            >

              {/* Order Header */}
              <div className="border-b border-gray-200 p-4 sm:p-6">

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                  <div className="min-w-0">

                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Order ID
                    </p>

                    <p className="mt-1 break-all text-sm font-bold text-gray-900 sm:text-base">
                      {order._id}
                    </p>

                  </div>

                  <div className="sm:text-right">

                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Order Date
                    </p>

                    <p className="mt-1 text-sm font-semibold text-gray-900">
                      {new Date(order.createdAt).toLocaleDateString(
                        "en-IN",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        }
                      )}
                    </p>

                  </div>

                </div>

              </div>

              {/* Products */}
              <div className="p-4 sm:p-6">

                <div className="space-y-4">

                  {order.items.map((item, index) => (
                    <div
                      key={`${order._id}-${index}`}
                      className="flex gap-3 sm:gap-4"
                    >

                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-16 w-16 shrink-0 rounded-xl object-cover sm:h-20 sm:w-20"
                      />

                      <div className="min-w-0 flex-1">

                        <h2 className="line-clamp-2 text-sm font-bold text-gray-900 sm:text-base">
                          {item.name}
                        </h2>

                        <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                          Quantity: {item.quantity}
                        </p>

                        <p className="mt-1 text-xs text-gray-600 sm:text-sm">
                          ₹{item.price.toLocaleString("en-IN")} each
                        </p>

                      </div>

                      <div className="shrink-0 text-right">

                        <p className="text-sm font-bold text-gray-900 sm:text-base">
                          ₹
                          {(item.price * item.quantity).toLocaleString(
                            "en-IN"
                          )}
                        </p>

                      </div>

                    </div>
                  ))}

                </div>

              </div>

              {/* Order Footer */}
              <div className="border-t border-gray-200 bg-gray-50 p-4 sm:p-6">

                <div className="flex flex-col gap-5">

                  {/* Status */}
                  <div className="flex flex-wrap items-center gap-3">

                    <span className="text-sm text-gray-500">
                      Status:
                    </span>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold sm:text-sm ${statusStyles}`}
                    >
                      {order.orderStatus}
                    </span>

                    <span className="text-xs text-gray-500 sm:text-sm">
                      Payment:{" "}
                      <span className="font-semibold text-gray-700">
                        {order.paymentMethod}
                      </span>
                    </span>

                  </div>

                  {/* Total + Button */}
                  <div className="flex items-center justify-between gap-4">

                    <div>
                      <p className="text-xs text-gray-500">
                        Total Amount
                      </p>

                      <p className="mt-1 text-xl font-extrabold text-gray-900 sm:text-2xl">
                        ₹{order.totalPrice.toLocaleString("en-IN")}
                      </p>
                    </div>

                    <Link
                      to={`/orders/${order._id}`}
                      className="rounded-xl bg-indigo-600 px-4 py-3 text-center text-sm font-bold text-white transition hover:bg-indigo-700 active:scale-95 sm:px-6"
                    >
                      View Details
                    </Link>

                  </div>

                </div>

              </div>

            </article>
          );
        })}

      </div>

    </section>
  );
}

export default Orders;