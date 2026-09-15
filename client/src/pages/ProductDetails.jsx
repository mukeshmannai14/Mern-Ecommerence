import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";

import { addToCart } from "../redux/cartSlice";

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/products/${id}`
        );

        setProduct(response.data.product);
      } catch (error) {
        console.error("FETCH PRODUCT ERROR:", error);
        setError("Product not found.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product || product.stock <= 0) return;

    dispatch(addToCart(product));

    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 2000);
  };

  if (loading) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="animate-pulse">
          <div className="h-5 w-36 rounded bg-gray-200" />

          <div className="mt-8 grid gap-8 md:grid-cols-2 lg:gap-12">
            <div className="aspect-square rounded-2xl bg-gray-200" />

            <div className="flex flex-col justify-center">
              <div className="h-5 w-28 rounded bg-gray-200" />
              <div className="mt-4 h-10 w-3/4 rounded bg-gray-200" />
              <div className="mt-6 h-24 w-full rounded bg-gray-100" />
              <div className="mt-8 h-10 w-40 rounded bg-gray-200" />
              <div className="mt-8 h-14 w-full rounded-xl bg-gray-200" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !product) {
    return (
      <section className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
        <div className="text-6xl">😕</div>

        <h2 className="mt-5 text-2xl font-bold text-gray-900 sm:text-3xl">
          {error || "Product not found"}
        </h2>

        <p className="mt-2 text-sm text-gray-600">
          The product you're looking for may no longer be available.
        </p>

        <Link
          to="/products"
          className="mt-6 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
        >
          ← Back to Products
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
      {/* Back Button */}
      <Link
        to="/products"
        className="inline-flex items-center text-sm font-semibold text-indigo-600 transition hover:text-indigo-700"
      >
        ← Back to Products
      </Link>

      {/* Product */}
      <div className="mt-8 grid gap-8 md:grid-cols-2 md:gap-10 lg:gap-16">
        {/* PRODUCT IMAGE */}
        <div className="overflow-hidden rounded-2xl bg-gray-100 shadow-sm sm:rounded-3xl">
          <div className="aspect-square">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* PRODUCT INFORMATION */}
        <div className="flex flex-col justify-center">
          {/* Category */}
          <p className="text-xs font-bold uppercase tracking-widest text-indigo-600 sm:text-sm">
            {product.category}
          </p>

          {/* Name */}
          <h1 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            {product.name}
          </h1>

          {/* Description */}
          <p className="mt-5 text-base leading-7 text-gray-600 sm:mt-6 sm:text-lg sm:leading-8">
            {product.description}
          </p>

          {/* Price */}
          <div className="mt-6 sm:mt-8">
            <span className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              ₹{product.price.toLocaleString("en-IN")}
            </span>
          </div>

          {/* Stock */}
          <div className="mt-5">
            {product.stock > 0 ? (
              <div className="inline-flex flex-wrap items-center gap-2 rounded-full bg-green-50 px-4 py-2">
                <span className="text-green-600">✓</span>

                <span className="text-sm font-semibold text-green-700">
                  In Stock
                </span>

                <span className="text-sm text-green-600">
                  ({product.stock} available)
                </span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2">
                <span className="text-red-600">✕</span>

                <span className="text-sm font-semibold text-red-700">
                  Out of Stock
                </span>
              </div>
            )}
          </div>

          {/* Add To Cart */}
          <button
            type="button"
            disabled={product.stock === 0}
            onClick={handleAddToCart}
            className={`mt-7 w-full rounded-xl px-6 py-4 text-base font-bold text-white shadow-sm transition active:scale-[0.98] sm:mt-8 sm:text-lg ${
              product.stock === 0
                ? "cursor-not-allowed bg-gray-400"
                : added
                ? "bg-green-600"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {product.stock === 0
              ? "Out of Stock"
              : added
              ? "✓ Added to Cart"
              : "Add to Cart"}
          </button>

          {/* Additional Information */}
          <div className="mt-8 grid grid-cols-1 divide-y rounded-2xl border border-gray-200 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            <div className="p-4 text-center">
              <div className="text-xl">🚚</div>
              <p className="mt-2 text-xs font-bold text-gray-900 sm:text-sm">
                Fast Delivery
              </p>
            </div>

            <div className="p-4 text-center">
              <div className="text-xl">🔒</div>
              <p className="mt-2 text-xs font-bold text-gray-900 sm:text-sm">
                Secure Checkout
              </p>
            </div>

            <div className="p-4 text-center">
              <div className="text-xl">↩️</div>
              <p className="mt-2 text-xs font-bold text-gray-900 sm:text-sm">
                Easy Shopping
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Information */}
      <div className="mt-12 border-t border-gray-200 pt-8 sm:mt-16 sm:pt-10">
        <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
          Product Information
        </h2>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl bg-gray-50 p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              Category
            </p>

            <p className="mt-2 font-bold text-gray-900">
              {product.category}
            </p>
          </div>

          <div className="rounded-xl bg-gray-50 p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              Availability
            </p>

            <p className="mt-2 font-bold text-gray-900">
              {product.stock > 0
                ? `${product.stock} units available`
                : "Currently unavailable"}
            </p>
          </div>

          <div className="rounded-xl bg-gray-50 p-5 sm:col-span-2 lg:col-span-1">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              Price
            </p>

            <p className="mt-2 font-bold text-gray-900">
              ₹{product.price.toLocaleString("en-IN")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetails;