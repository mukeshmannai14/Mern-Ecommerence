import { Link, useParams } from "react-router-dom";

function OrderSuccess() {
  const { orderId } = useParams();

  return (
    <main className="flex min-h-[calc(100vh-73px)] items-center justify-center bg-gray-50 px-4 py-10 sm:px-6 sm:py-16">
      <div className="w-full max-w-2xl text-center">

        {/* Success Icon */}
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-green-100 sm:h-28 sm:w-28">
          <span className="text-5xl sm:text-6xl">✓</span>
        </div>

        {/* Heading */}
        <h1 className="mt-7 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
          Order Placed Successfully!
        </h1>

        <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-gray-600 sm:text-base sm:leading-7">
          Thank you for your purchase. Your order has been successfully
          received and is being processed.
        </p>

        {/* Order ID */}
        <div className="mx-auto mt-7 max-w-md rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
            Order ID
          </p>

          <p className="mt-2 break-all text-sm font-bold text-gray-900 sm:text-base">
            {orderId}
          </p>
        </div>

        {/* Status */}
        <div className="mx-auto mt-6 max-w-md rounded-2xl border border-indigo-100 bg-indigo-50 p-5 text-left sm:p-6">
          <div className="flex gap-4">
            <span className="text-2xl">📦</span>

            <div>
              <h2 className="font-bold text-gray-900">
                Your order is being processed
              </h2>

              <p className="mt-1 text-sm leading-6 text-gray-600">
                You can view your order details and track its status from
                your orders page.
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            to={`/orders/${orderId}`}
            className="w-full rounded-xl bg-indigo-600 px-7 py-3.5 text-center text-sm font-bold text-white shadow-sm transition hover:bg-indigo-700 active:scale-[0.98] sm:w-auto sm:text-base"
          >
            View Order
          </Link>

          <Link
            to="/products"
            className="w-full rounded-xl border border-gray-300 bg-white px-7 py-3.5 text-center text-sm font-bold text-gray-700 transition hover:bg-gray-100 active:scale-[0.98] sm:w-auto sm:text-base"
          >
            Continue Shopping
          </Link>
        </div>

        {/* Order History */}
        <Link
          to="/orders"
          className="mt-6 inline-block text-sm font-semibold text-indigo-600 transition hover:text-indigo-700"
        >
          View All Orders →
        </Link>
      </div>
    </main>
  );
}

export default OrderSuccess;