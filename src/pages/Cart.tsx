import { useMemo, useCallback } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { state, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  // Hitung total harga pakai useMemo (price * quantity)
  const total = useMemo(() => {
    return state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }, [state.items]);

  // Handler hapus item
  const handleRemove = useCallback(
    (id: number) => {
      removeFromCart(id);
    },
    [removeFromCart]
  );

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-gray-700 dark:text-gray-200">
        <h2 className="text-2xl font-bold mb-3">Keranjang Kosong 😢</h2>
        <button
          onClick={() => navigate("/products")}
          className="px-4 py-2 bg-indigo-600 dark:bg-indigo-500 text-white rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition"
        >
          Lihat Produk
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-gray-900 dark:text-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Your Cart</h1>
        <button
          onClick={() => clearCart()}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-medium"
        >
          Remove All
        </button>
      </div>

      <div className="space-y-4">
        {state.items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-xl shadow border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.title}
                className="w-16 h-16 object-contain rounded"
              />
              <div>
                <p className="font-medium">
                  {item.title} {item.quantity > 1 && <span className="text-indigo-600 dark:text-indigo-400">x{item.quantity}</span>}
                </p>
                <p className="text-indigo-600 dark:text-indigo-400 font-bold">
                  ${item.price} {item.quantity > 1 && <span className="text-sm text-gray-500 dark:text-gray-400">(${(item.price * item.quantity).toFixed(2)} total)</span>}
                </p>
              </div>
            </div>

            <button
              onClick={() => handleRemove(item.id)}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-between">
        <p className="text-xl font-semibold">Total:</p>
        <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
          ${total.toFixed(2)}
        </p>
      </div>

      <button
        onClick={() => navigate("/checkout")}
        className="mt-6 w-full py-3 bg-indigo-600 dark:bg-indigo-500 text-white rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition text-lg font-semibold"
      >
        Checkout
      </button>
    </div>
  );
}
