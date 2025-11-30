import Home from "./pages/Home";
import { CartProvider } from "./context/CartContext";
import ThemeProvider from "./context/ThemeContext";
import { useContext, useEffect } from "react";
import { ThemeContext } from "./context/ThemeContext";

function AppContent() {
  const context = useContext(ThemeContext);
  const theme = context?.theme || "light";

  // Apply theme to body element and html element
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
    <div className={`min-h-screen ${theme === "dark" ? "dark bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}>
      <Home />
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
