import { useEffect, useState } from "react";
import axios from "axios";

function Admin() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
    stock: "",
  });

  const getToken = () => localStorage.getItem("token");

  /* =========================
     FETCH PRODUCTS
  ========================== */

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/products`
      );

      setProducts(response.data.products || []);
      setError("");
    } catch (error) {
      console.error("FETCH PRODUCTS ERROR:", error);

      setError(
        error.response?.data?.message ||
          "Failed to load products."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  /* =========================
     FORM CHANGE
  ========================== */

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /* =========================
     RESET FORM
  ========================== */

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      category: "",
      image: "",
      stock: "",
    });

    setEditingId(null);
  };

  /* =========================
     SUBMIT PRODUCT
  ========================== */

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    const token = getToken();

    if (!token) {
      setError("Please login as admin.");
      return;
    }

    try {
      setSaving(true);

      const productData = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        price: Number(formData.price),
        category: formData.category.trim(),
        image: formData.image.trim(),
        stock: Number(formData.stock),
      };

      if (editingId) {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/api/products/${editingId}`,
          productData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setMessage("Product updated successfully.");
      } else {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/products`,
          productData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setMessage("Product added successfully.");
      }

      resetForm();

      await fetchProducts();
    } catch (error) {
      console.error("PRODUCT SAVE ERROR:", error);

      setError(
        error.response?.data?.message ||
          "Failed to save product."
      );
    } finally {
      setSaving(false);
    }
  };

  /* =========================
     EDIT PRODUCT
  ========================== */

  const handleEdit = (product) => {
    setEditingId(product._id);

    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      image: product.image,
      stock: product.stock,
    });

    setMessage("");
    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =========================
     DELETE PRODUCT
  ========================== */

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      setError("");
      setMessage("");

      const token = getToken();

      if (!token) {
        setError("Please login as admin.");
        return;
      }

      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("Product deleted successfully.");

      await fetchProducts();
    } catch (error) {
      console.error("DELETE PRODUCT ERROR:", error);

      setError(
        error.response?.data?.message ||
          "Failed to delete product."
      );
    }
  };

  /* =========================
     LOADING
  ========================== */

  if (loading) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="animate-pulse">
          <div className="h-10 w-64 rounded-lg bg-gray-200" />

          <div className="mt-3 h-5 w-96 max-w-full rounded bg-gray-100" />

          <div className="mt-10 h-[500px] rounded-2xl bg-gray-100" />
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
      {/* HEADER */}

      <div className="mb-8 sm:mb-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-indigo-600">
              Store Management
            </p>

            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Admin Dashboard
            </h1>

            <p className="mt-2 text-sm text-gray-600 sm:text-base">
              Manage products, pricing and inventory.
            </p>
          </div>

          <div className="w-fit rounded-xl bg-indigo-50 px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
              Products
            </p>

            <p className="mt-1 text-xl font-extrabold text-indigo-700">
              {products.length}
            </p>
          </div>
        </div>
      </div>

      {/* ALERTS */}

      {error && (
        <div className="mb-6 flex gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-4 text-sm text-red-700 sm:px-5">
          <span>⚠️</span>
          <p>{error}</p>
        </div>
      )}

      {message && (
        <div className="mb-6 flex gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-4 text-sm text-green-700 sm:px-5">
          <span>✓</span>
          <p>{message}</p>
        </div>
      )}

      {/* PRODUCT FORM */}

      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              Product Management
            </p>

            <h2 className="mt-1 text-xl font-extrabold text-gray-900 sm:text-2xl">
              {editingId ? "Edit Product" : "Add Product"}
            </h2>
          </div>

          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 sm:w-auto"
            >
              Cancel Edit
            </button>
          )}
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-6 grid gap-5 sm:grid-cols-2"
        >
          {/* Name */}

          <div className="sm:col-span-2">
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Product Name
            </label>

            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter product name"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 sm:text-base"
            />
          </div>

          {/* Description */}

          <div className="sm:col-span-2">
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Description
            </label>

            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="4"
              placeholder="Enter product description"
              className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 sm:text-base"
            />
          </div>

          {/* Price */}

          <div>
            <label
              htmlFor="price"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Price (₹)
            </label>

            <input
              id="price"
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              inputMode="decimal"
              placeholder="1499"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 sm:text-base"
            />
          </div>

          {/* Category */}

          <div>
            <label
              htmlFor="category"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Category
            </label>

            <input
              id="category"
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              placeholder="Electronics"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 sm:text-base"
            />
          </div>

          {/* Image */}

          <div className="sm:col-span-2">
            <label
              htmlFor="image"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Image URL
            </label>

            <input
              id="image"
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              required
              placeholder="https://example.com/image.jpg"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 sm:text-base"
            />
          </div>

          {/* Stock */}

          <div>
            <label
              htmlFor="stock"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Stock
            </label>

            <input
              id="stock"
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              required
              min="0"
              inputMode="numeric"
              placeholder="50"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 sm:text-base"
            />
          </div>

          {/* Submit */}

          <div className="flex items-end">
            <button
              type="submit"
              disabled={saving}
              className="w-full rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-indigo-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-gray-400 sm:text-base"
            >
              {saving
                ? "Saving..."
                : editingId
                ? "Update Product"
                : "Add Product"}
            </button>
          </div>
        </form>
      </div>

      {/* PRODUCTS */}

      <div className="mt-10">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              Inventory
            </p>

            <h2 className="mt-1 text-2xl font-extrabold text-gray-900 sm:text-3xl">
              Products
            </h2>
          </div>

          <p className="text-sm text-gray-500">
            {products.length}{" "}
            {products.length === 1 ? "product" : "products"}
          </p>
        </div>

        {products.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-dashed border-gray-300 bg-white px-5 py-16 text-center">
            <div className="text-5xl">📦</div>

            <h3 className="mt-5 text-xl font-bold text-gray-900">
              No Products Available
            </h3>

            <p className="mt-2 text-sm text-gray-600">
              Add your first product using the form above.
            </p>
          </div>
        ) : (
          <div className="mt-6 space-y-4">
            {products.map((product) => (
              <article
                key={product._id}
                className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5"
              >
                <div className="flex flex-col gap-5 md:flex-row md:items-center">
                  {/* Image */}

                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="h-52 w-full rounded-xl object-cover md:h-24 md:w-24"
                  />

                  {/* Details */}

                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold uppercase tracking-wide text-indigo-600">
                      {product.category}
                    </p>

                    <h3 className="mt-1 text-lg font-extrabold text-gray-900">
                      {product.name}
                    </h3>

                    <p className="mt-1 line-clamp-2 text-sm text-gray-500">
                      {product.description}
                    </p>

                    <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2">
                      <p className="font-bold text-gray-900">
                        ₹{product.price.toLocaleString("en-IN")}
                      </p>

                      <p
                        className={`text-sm font-semibold ${
                          product.stock === 0
                            ? "text-red-600"
                            : product.stock <= 5
                            ? "text-orange-600"
                            : "text-green-600"
                        }`}
                      >
                        Stock: {product.stock}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}

                  <div className="grid grid-cols-2 gap-3 md:flex md:shrink-0">
                    <button
                      type="button"
                      onClick={() => handleEdit(product)}
                      className="rounded-xl bg-indigo-50 px-4 py-3 text-sm font-bold text-indigo-600 transition hover:bg-indigo-100 active:scale-95"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(product._id)}
                      className="rounded-xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600 transition hover:bg-red-100 active:scale-95"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Admin;