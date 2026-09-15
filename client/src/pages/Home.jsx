import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ProductCard from "../components/ProductCard";

const categories = [
  {
    name: "Electronics",
    icon: "🎧",
    description: "Smart devices & gadgets",
  },
  {
    name: "Mobiles",
    icon: "📱",
    description: "Latest smartphones",
  },
  {
    name: "Laptops",
    icon: "💻",
    description: "Work & gaming laptops",
  },
  {
    name: "Men's Fashion",
    icon: "👕",
    description: "Style for every occasion",
  },
  {
    name: "Women's Fashion",
    icon: "👗",
    description: "Trendy fashion collection",
  },
  {
    name: "Footwear",
    icon: "👟",
    description: "Shoes for every lifestyle",
  },
  {
    name: "Home & Kitchen",
    icon: "🏠",
    description: "Make your home better",
  },
  {
    name: "Beauty",
    icon: "💄",
    description: "Beauty & skincare",
  },
  {
    name: "Sports",
    icon: "⚽",
    description: "Fitness & sports gear",
  },
  {
    name: "Accessories",
    icon: "🎒",
    description: "Complete your style",
  },
  {
    name: "Books",
    icon: "📚",
    description: "Learn something new",
  },
];

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/products"
        );

        setProducts(response.data.products || []);
      } catch (error) {
        console.error("FETCH PRODUCTS ERROR:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const featuredProducts = products.slice(0, 8);

  const getCategoryProducts = (category) => {
    return products.filter(
      (product) => product.category === category
    );
  };

  const totalCategories = useMemo(() => {
    return new Set(products.map((product) => product.category)).size;
  }, [products]);

  return (
    <main className="overflow-hidden bg-white">

      {/* =========================================
          HERO SECTION
      ========================================= */}

      <section className="bg-gray-50">
        <div className="mx-auto grid min-h-[calc(100vh-73px)] max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-20">

          <div className="text-center lg:text-left">

            <span className="inline-block rounded-full bg-indigo-100 px-4 py-2 text-xs font-bold uppercase tracking-wider text-indigo-600 sm:text-sm">
              Welcome to ShopHub
            </span>

            <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl">
              Shop Smarter.
              <span className="block text-indigo-600">
                Live Better.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-gray-600 sm:text-lg sm:leading-8 lg:mx-0">
              Discover quality products across multiple categories.
              Find what you love, add it to your cart, and enjoy a
              simple shopping experience.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">

              <Link
                to="/products"
                className="rounded-xl bg-indigo-600 px-7 py-3.5 text-center text-sm font-bold text-white shadow-sm transition hover:bg-indigo-700 active:scale-95 sm:text-base"
              >
                Shop Now →
              </Link>

              <a
                href="#categories"
                className="rounded-xl border border-gray-300 bg-white px-7 py-3.5 text-center text-sm font-bold text-gray-700 transition hover:bg-gray-100 active:scale-95 sm:text-base"
              >
                Explore Categories
              </a>

            </div>

            <div className="mt-10 grid grid-cols-3 gap-3 border-t border-gray-200 pt-8 sm:gap-6">

              <div>
                <p className="text-xl font-bold text-gray-900 sm:text-2xl">
                  {products.length}+
                </p>

                <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                  Products
                </p>
              </div>

              <div>
                <p className="text-xl font-bold text-gray-900 sm:text-2xl">
                  {totalCategories}+
                </p>

                <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                  Categories
                </p>
              </div>

              <div>
                <p className="text-xl font-bold text-gray-900 sm:text-2xl">
                  100%
                </p>

                <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                  Secure
                </p>
              </div>

            </div>
          </div>

          {/* Hero Image */}

          <div className="relative order-first lg:order-last">

            <div className="overflow-hidden rounded-3xl bg-gray-200 shadow-xl">

              <img
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d"
                alt="Online shopping"
                className="h-[300px] w-full object-cover sm:h-[400px] md:h-[500px] lg:h-[550px]"
              />

            </div>

            <div className="absolute bottom-4 left-4 rounded-2xl bg-white p-4 shadow-xl sm:bottom-6 sm:left-6 sm:p-5">

              <p className="text-xs font-medium text-gray-500 sm:text-sm">
                Shopping made
              </p>

              <p className="mt-1 text-base font-bold text-gray-900 sm:text-lg">
                Simple & Easy ✨
              </p>

            </div>

          </div>

        </div>
      </section>

      {/* =========================================
          FEATURES
      ========================================= */}

      <section className="border-b border-gray-100 bg-white">

        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">

          <div className="rounded-2xl bg-gray-50 p-5 text-center sm:text-left">
            <div className="text-3xl">🚚</div>
            <h3 className="mt-3 font-bold text-gray-900">
              Fast Delivery
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Get your products delivered quickly.
            </p>
          </div>

          <div className="rounded-2xl bg-gray-50 p-5 text-center sm:text-left">
            <div className="text-3xl">🔒</div>
            <h3 className="mt-3 font-bold text-gray-900">
              Secure Shopping
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Your shopping experience stays secure.
            </p>
          </div>

          <div className="rounded-2xl bg-gray-50 p-5 text-center sm:text-left">
            <div className="text-3xl">💳</div>
            <h3 className="mt-3 font-bold text-gray-900">
              Easy Checkout
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Simple and convenient checkout process.
            </p>
          </div>

          <div className="rounded-2xl bg-gray-50 p-5 text-center sm:text-left">
            <div className="text-3xl">⭐</div>
            <h3 className="mt-3 font-bold text-gray-900">
              Quality Products
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Discover products worth buying.
            </p>
          </div>

        </div>

      </section>

      {/* =========================================
          CATEGORIES
      ========================================= */}

      <section
        id="categories"
        className="bg-white"
      >
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">

          <div className="text-center">

            <p className="text-sm font-bold uppercase tracking-wider text-indigo-600">
              Shop By Category
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Explore Our Categories
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-gray-600 sm:text-base">
              Browse our wide range of products and find exactly
              what you're looking for.
            </p>

          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-6">

            {categories.map((category) => {

              const count = getCategoryProducts(category.name).length;

              return (
                <Link
                  key={category.name}
                  to={`/products?category=${encodeURIComponent(category.name)}`}
                  className="group rounded-2xl border border-gray-200 bg-gray-50 p-4 text-center transition duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:bg-indigo-50 hover:shadow-md sm:p-5"
                >

                  <div className="text-4xl transition duration-300 group-hover:scale-110">
                    {category.icon}
                  </div>

                  <h3 className="mt-3 text-sm font-bold text-gray-900">
                    {category.name}
                  </h3>

                  <p className="mt-1 hidden text-xs text-gray-500 sm:block">
                    {category.description}
                  </p>

                  <p className="mt-2 text-xs font-semibold text-indigo-600">
                    {count} Products
                  </p>

                </Link>
              );
            })}

          </div>

        </div>
      </section>

      {/* =========================================
          FEATURED PRODUCTS
      ========================================= */}

      <section className="bg-gray-50">

        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-indigo-600">
                Top Picks
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Featured Products
              </h2>

              <p className="mt-2 text-sm text-gray-600 sm:text-base">
                Check out some of our latest products.
              </p>
            </div>

            <Link
              to="/products"
              className="w-fit text-sm font-bold text-indigo-600 transition hover:text-indigo-700"
            >
              View All →
            </Link>

          </div>

          {loading ? (

            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="h-96 animate-pulse rounded-2xl bg-gray-200"
                />
              ))}

            </div>

          ) : (

            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

              {featuredProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                />
              ))}

            </div>

          )}

        </div>

      </section>

      {/* =========================================
          CATEGORY PRODUCT SECTIONS
      ========================================= */}

      {!loading &&
        categories.map((category) => {

          const categoryProducts = getCategoryProducts(category.name);

          if (categoryProducts.length === 0) {
            return null;
          }

          return (
            <section
              key={category.name}
              className="border-b border-gray-100 bg-white"
            >

              <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8">

                <div className="flex items-end justify-between gap-4">

                  <div>

                    <p className="text-sm font-bold uppercase tracking-wider text-indigo-600">
                      {category.icon} {category.name}
                    </p>

                    <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                      {category.name}
                    </h2>

                  </div>

                  <Link
                    to={`/products?category=${encodeURIComponent(category.name)}`}
                    className="shrink-0 text-sm font-bold text-indigo-600 transition hover:text-indigo-700"
                  >
                    View All →
                  </Link>

                </div>

                {/* Desktop Grid / Mobile Horizontal Scroll */}

                <div className="mt-7 flex gap-4 overflow-x-auto pb-4 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:pb-0 lg:grid-cols-4">

                  {categoryProducts.slice(0, 4).map((product) => (

                    <div
                      key={product._id}
                      className="w-[78vw] shrink-0 sm:w-auto"
                    >

                      <ProductCard product={product} />

                    </div>

                  ))}

                </div>

              </div>

            </section>
          );
        })}

      {/* =========================================
          CTA
      ========================================= */}

      <section className="bg-gray-900">

        <div className="mx-auto max-w-7xl px-4 py-14 text-center sm:px-6 sm:py-16 lg:px-8">

          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to start shopping?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-gray-300 sm:text-base sm:leading-7">
            Explore 60+ products across multiple categories and
            find something you love.
          </p>

          <Link
            to="/products"
            className="mt-7 inline-block rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-gray-900 transition hover:bg-gray-100 active:scale-95 sm:text-base"
          >
            Explore All Products →
          </Link>

        </div>

      </section>

    </main>
  );
}

export default Home;