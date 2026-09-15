import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">

      {/* Product Image */}
      <Link
        to={`/products/${product._id}`}
        className="block overflow-hidden bg-gray-100"
      >
        <div className="relative aspect-square sm:aspect- [4/3]">

          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />

          {/* Stock Badge */}
          <div className="absolute left-3 top-3">
            {product.stock > 0 ? (
              <span className="rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-green-600 shadow-sm backdrop-blur">
                In Stock
              </span>
            ) : (
              <span className="rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-red-600 shadow-sm backdrop-blur">
                Out of Stock
              </span>
            )}
          </div>

        </div>
      </Link>

      {/* Product Content */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">

        {/* Category */}
        <p className="text-xs font-bold uppercase tracking-wider text-indigo-600 sm:text-sm">
          {product.category}
        </p>

        {/* Product Name */}
        <Link to={`/products/${product._id}`}>
          <h2 className="mt-2 line-clamp-2 text-base font-bold leading-6 text-gray-900 transition hover:text-indigo-600 sm:text-lg">
            {product.name}
          </h2>
        </Link>

        {/* Description */}
        <p className="mt-2 line-clamp-2 text-sm leading-5 text-gray-600">
          {product.description}
        </p>

        {/* Price + Button */}
        <div className="mt-auto pt-5">

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

            <span className="text-xl font-extrabold text-gray-900 sm:text-2xl">
              ₹{product.price.toLocaleString("en-IN")}
            </span>

            <Link
              to={`/products/${product._id}`}
              className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-center text-sm font-bold text-white transition hover:bg-indigo-700 active:scale-95 sm:w-auto"
            >
              View Product
            </Link>

          </div>

        </div>
      </div>
    </article>
  );
}

export default ProductCard;