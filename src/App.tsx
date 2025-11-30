import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Checkout from "./pages/Checkout";
import PrivateRoute from "./router/PrivateRoute";

import { CartProvider } from "./context/CartContext";
import ThemeProvider, { ThemeContext } from "./context/ThemeContext";

import { useContext, useEffect } from "react";

function AppContent() {
  const context = useContext(ThemeContext);
  const theme = context?.theme || "light";

  // Apply theme to HTML & Body
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      document.body.style.backgroundColor = "#111827"; // gray-900
      document.body.style.color = "#ffffff";
    } else {
      document.documentElement.classList.remove("dark");
      document.body.style.backgroundColor = "#f9fafb"; // gray-50
      document.body.style.color = "#111827";
    }
  }, [theme]);

  return (
    <div
      className={`min-h-screen ${
        theme === "dark" ? "dark bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <BrowserRouter>
        <Routes>

          {/* redirect dari "/" */}
          <Route path="/" element={<Navigate to="/products" replace />} />

          {/* Product List */}
          <Route path="/products" element={<Products />} />

          {/* Detail Product */}
          <Route path="/product/:id" element={<ProductDetail />} />

          {/* Cart */}
          <Route path="/cart" element={<Cart />} />

          {/* Login */}
          <Route path="/login" element={<Login />} />

          {/* Protected Route */}
          <Route element={<PrivateRoute />}>
            <Route path="/checkout" element={<Checkout />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </ThemeProvider>
  );
}
