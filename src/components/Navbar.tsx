import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { state } = useCart();
  const { pathname } = useLocation();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <nav className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 backdrop-blur-sm bg-opacity-95 dark:bg-opacity-95">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo/Brand */}
        <Link 
          to="/products" 
          className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent hover:scale-105 transition-transform flex-shrink-0"
          onClick={closeMobileMenu}
        >
          🛍️ Shop
        </Link>

        {/* Desktop Navigation - Hidden on mobile */}
        <div className="hidden md:flex items-center gap-2">
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

        {/* Desktop Auth & Theme - Hidden on mobile */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <span className="text-sm text-gray-600 dark:text-gray-300 font-medium truncate max-w-[150px]">
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

        {/* Mobile Menu Button & Theme Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 space-y-2">
          <Link 
            to="/products" 
            className={`${getLinkClasses("/products")} block text-center`}
            onClick={closeMobileMenu}
          >
            <span className="flex items-center justify-center gap-2">
              📦 Products
            </span>
          </Link>
          
          <Link 
            to="/cart" 
            className={`${getLinkClasses("/cart")} block text-center`}
            onClick={closeMobileMenu}
          >
            <span className="flex items-center justify-center gap-2">
              🛒 Cart
              {state.items.length > 0 && (
                <span className="ml-1 px-2 py-0.5 text-xs font-bold rounded-full bg-red-500 text-white animate-pulse">
                  {state.items.length}
                </span>
              )}
            </span>
          </Link>

          {user ? (
            <>
              <div className="px-4 py-2 text-sm text-center text-gray-600 dark:text-gray-300 font-medium">
                👋 {user.email}
              </div>
              <button
                onClick={() => {
                  logout();
                  closeMobileMenu();
                }}
                className="w-full px-4 py-2 rounded-lg font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <Link 
              to="/login" 
              className={`${getLinkClasses("/login")} block text-center`}
              onClick={closeMobileMenu}
            >
              <span className="flex items-center justify-center gap-2">
                🔐 Login
              </span>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
