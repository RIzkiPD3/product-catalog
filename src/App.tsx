import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Checkout from "./pages/Checkout";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./router/PrivateRoute";
import AdminRoute from "./router/AdminRoute";
import AuthProvider from "./context/AuthContext";
import ErrorBoundary from "./components/ErrorBoundary";
import Navbar from "./components/Navbar";

import { CartProvider } from "./context/CartContext";
import { ProductProvider } from "./context/ProductContext";
import ThemeProvider, { ThemeContext } from "./context/ThemeContext";

import { useContext, useEffect } from "react";

function AppContent() {
  const context = useContext(ThemeContext);
  const theme = context?.theme || "light";

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      document.body.style.backgroundColor = "#111827";
      document.body.style.color = "#ffffff";
    } else {
      document.documentElement.classList.remove("dark");
      document.body.style.backgroundColor = "#f9fafb";
      document.body.style.color = "#111827";
    }
  }, [theme]);

  return (
    <div
      className={`min-h-screen ${
        theme === "dark"
          ? "dark bg-gray-900 text-white"
          : "bg-gray-50 text-gray-900"
      }`}
    >
      <BrowserRouter>
        {/* ⬇️ ErrorBoundary DIPINDAH KE SINI */}
        <Navbar />  
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Navigate to="/products" replace />} />

            <Route path="/products" element={<Products />} />

            <Route path="/product/:id" element={<ProductDetail />} />

            <Route path="/cart" element={<Cart />} />

            <Route path="/login" element={<Login />} />

            <Route path="/register" element={<Register />} />

            <Route element={<PrivateRoute />}>
              <Route path="/checkout" element={<Checkout />} />
            </Route>

            <Route element={<AdminRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
          </Routes>
        </ErrorBoundary>
      </BrowserRouter>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ProductProvider>
        <CartProvider>
          <AuthProvider>
            <AppContent />
          </AuthProvider>
        </CartProvider>
      </ProductProvider>
    </ThemeProvider>
  );
}
