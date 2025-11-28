import Home from "./pages/Home";
import { CartProvider } from "./context/CartContext";

export default function App() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-50">
        <Home />
      </div>
    </CartProvider>
  );
}
