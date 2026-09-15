import { useEffect, useMemo, useState } from "react";
import axios from "axios";

import ProductCard from "../components/ProductCard";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/products`
        );

        setProducts(response.data.products || []);
      } catch (error) {
        console.error("FETCH PRODUCTS ERROR:", error);
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = useMemo(() => {
    return [
      "All",
      ...new Set(products.map((product) => product.category)),
    ];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const searchText = search.toLowerCase().trim();

      const matchesSearch =
        product.name.toLowerCase().includes(searchText) ||
        product.description.toLowerCase().includes(searchText);

      const matchesCategory =
        category === "All" || product.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [products, search, category]);

  const clearFilters = () => {
    setSearch("");
    setCategory("All");
  };

  if (loading) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-10">
          <div className="h-10 w-56 animate-pulse rounded-lg bg-gray-200" />
          <div className="mt-3 h-5 w-80 max-w-full animate-pulse rounded bg-gray-100" />
        </div>

        <div className="mb-10 grid gap-4 md:grid-cols-3">
          <div className="h-12 animate-pulse rounded-xl bg-gray-100 md:col-span-2" />
          <div className="h-12 animate-pulse rounded-xl bg-gray-100" />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div
              key={item}
              className="h-96 animate-pulse rounded-2xl bg-gray-100"
            />
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="text-center">
          <div className="text-5xl">⚠️</div>

          <h1 className="mt-4 text-2xl font-bold text-gray-900">
            Something went wrong
          </h1>

          <p className="mt-2 text-red-600">{error}</p>

          <button
            onClick={() => window.location.reload()}
            className="mt-6 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
      {/* =========================
          PAGE HEADER
      ========================== */}

      <div className="mb-8 sm:mb-10">
        <p className="text-sm font-bold uppercase tracking-wider text-indigo-600">
          Shop Collection
        </p>

        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          All Products
        </h1>

        <p className="mt-2 max-w-xl text-sm leading-6 text-gray-600 sm:text-base">
          Discover our latest products and find something you love.
        </p>
      </div>

      {/* =========================
          SEARCH + FILTER
      ========================== */}

      <div className="mb-8 rounded-2xl border border-gray-200 bg-gray-50 p-4 sm:p-5">
        <div className="grid gap-4 md:grid-cols-3">
          {/* Search */}

          <div className="md:col-span-2">
            <label
              htmlFor="product-search"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Search Products
            </label>

            <div className="relative">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                🔍
              </span>

              <input
                id="product-search"
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by product name or description..."
                className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 sm:text-base"
              />
            </div>
          </div>

          {/* Category */}

          <div>
            <label
              htmlFor="category-filter"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Category
            </label>

            <select
              id="category-filter"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 sm:text-base"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Filter Summary */}

        <div className="mt-4 flex flex-col gap-3 border-t border-gray-200 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-gray-600">
            Showing{" "}
            <span className="font-bold text-gray-900">
              {filteredProducts.length}
            </span>{" "}
            {filteredProducts.length === 1 ? "product" : "products"}
          </p>

          {(search || category !== "All") && (
            <button
              onClick={clearFilters}
              className="w-fit rounded-lg px-3 py-2 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-50"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* =========================
          PRODUCTS
      ========================== */}

      {filteredProducts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 px-5 py-16 text-center sm:px-10">
          <div className="text-5xl">🔎</div>

          <h2 className="mt-5 text-2xl font-bold text-gray-900">
            No Products Found
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-600 sm:text-base">
            We couldn't find any products matching your search or selected
            category.
          </p>

          <button
            onClick={clearFilters}
            className="mt-6 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700"
          >
            Show All Products
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}

export default Products;