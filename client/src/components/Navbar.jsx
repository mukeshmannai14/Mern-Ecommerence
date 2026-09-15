import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar() {
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.items);

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    setMenuOpen(false);

    navigate("/login");
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">

        {/* Logo */}
        <Link
          to="/"
          onClick={closeMenu}
          className="text-2xl font-bold tracking-tight text-gray-900"
        >
          Shop<span className="text-indigo-600">Hub</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <Link
            to="/"
            className="text-sm font-medium text-gray-700 transition hover:text-indigo-600"
          >
            Home
          </Link>

          <Link
            to="/products"
            className="text-sm font-medium text-gray-700 transition hover:text-indigo-600"
          >
            Products
          </Link>

          <Link
            to="/cart"
            className="text-sm font-medium text-gray-700 transition hover:text-indigo-600"
          >
            Cart

            {cartCount > 0 && (
              <span className="ml-2 rounded-full bg-indigo-600 px-2 py-1 text-xs font-bold text-white">
                {cartCount}
              </span>
            )}
          </Link>

          {user && (
            <Link
              to="/orders"
              className="text-sm font-medium text-gray-700 transition hover:text-indigo-600"
            >
              My Orders
            </Link>
          )}
        </div>

        {/* Desktop User Actions */}
        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <>
              <span className="text-sm font-medium text-gray-700">
                Hi, {user.name}
              </span>

              {user.role === "admin" && (
                <Link
                  to="/admin"
                  className="rounded-lg px-4 py-2 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-50"
                >
                  Admin
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-800"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-lg p-2 text-gray-700 transition hover:bg-gray-100 md:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="border-t border-gray-200 bg-white px-4 py-4 shadow-lg md:hidden">

          <div className="flex flex-col gap-2">

            <Link
              to="/"
              onClick={closeMenu}
              className="rounded-lg px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
            >
              🏠 Home
            </Link>

            <Link
              to="/products"
              onClick={closeMenu}
              className="rounded-lg px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
            >
              🛍️ Products
            </Link>

            <Link
              to="/cart"
              onClick={closeMenu}
              className="flex items-center justify-between rounded-lg px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
            >
              <span>🛒 Cart</span>

              {cartCount > 0 && (
                <span className="rounded-full bg-indigo-600 px-2.5 py-1 text-xs font-bold text-white">
                  {cartCount}
                </span>
              )}
            </Link>

            {user && (
              <Link
                to="/orders"
                onClick={closeMenu}
                className="rounded-lg px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
              >
                📦 My Orders
              </Link>
            )}

            {user && (
              <div className="my-2 border-t border-gray-200" />
            )}

            {user ? (
              <>
                <div className="rounded-lg bg-gray-50 px-4 py-3">
                  <p className="text-xs text-gray-500">
                    Logged in as
                  </p>

                  <p className="mt-1 font-semibold text-gray-900">
                    {user.name}
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    {user.email}
                  </p>
                </div>

                {user.role === "admin" && (
                  <Link
                    to="/admin"
                    onClick={closeMenu}
                    className="rounded-lg bg-indigo-50 px-4 py-3 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-100"
                  >
                    ⚙️ Admin Dashboard
                  </Link>
                )}

                <button
                  onClick={handleLogout}
                  className="w-full rounded-lg bg-gray-900 px-4 py-3 text-left text-sm font-semibold text-white transition hover:bg-gray-800"
                >
                  🚪 Logout
                </button>
              </>
            ) : (
              <>
                <div className="my-2 border-t border-gray-200" />

                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="rounded-lg px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                >
                  🔐 Login
                </Link>

                <Link
                  to="/register"
                  onClick={closeMenu}
                  className="rounded-lg bg-indigo-600 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-indigo-700"
                >
                  ✨ Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;