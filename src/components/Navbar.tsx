import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { state } = useCart();
  const { pathname } = useLocation();
  const { user, logout } = useAuth();

  const getLinkClasses = (path: string) => {
    const isActive = pathname === path;
    return `
      relative px-4 py-2 rounded-lg font-medium transition-all duration-200
      ${isActive 
        ? "text-white bg-gradient-to-r from-indigo-600 to-indigo-500 dark:from-indigo-500 dark:to-indigo-400 shadow-md" 
        : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-indigo-600 dark:hover:text-indigo-400"
      }
    `;
  };

  return (
    <nav className="w-full px-6 py-4 bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 backdrop-blur-sm bg-opacity-95 dark:bg-opacity-95">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Left - Logo & Navigation */}
        <div className="flex items-center gap-2">
          {/* Logo/Brand */}
          <Link 
            to="/products" 
            className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent mr-6 hover:scale-105 transition-transform"
          >
            🛍️ Shop
          </Link>
          
          {/* Navigation Links */}
          <Link to="/products" className={getLinkClasses("/products")}>
            <span className="flex items-center gap-2">
              📦 Products
            </span>
          </Link>
          
          <Link to="/cart" className={getLinkClasses("/cart")}>
            <span className="flex items-center gap-2">
              🛒 Cart
              {state.items.length > 0 && (
                <span className="ml-1 px-2 py-0.5 text-xs font-bold rounded-full bg-red-500 text-white animate-pulse">
                  {state.items.length}
                </span>
              )}
            </span>
          </Link>
        </div>

        {/* Right - Auth & Theme */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                👋 {user.email}
              </span>
              <button
                onClick={logout}
                className="px-4 py-2 rounded-lg font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className={getLinkClasses("/login")}>
              <span className="flex items-center gap-2">
                🔐 Login
              </span>
            </Link>
          )}
          
          <div className="ml-2 pl-3 border-l border-gray-300 dark:border-gray-600">
            <ThemeToggle />
          </div>
        </div>

      </div>
    </nav>
  );
}
