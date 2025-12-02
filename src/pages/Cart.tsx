import { useMemo, useCallback, useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ConfirmModal from "../components/ConfirmModal";
import InfoModal from "../components/InfoModal";

export default function Cart() {
  const { state, deleteFromCart, increaseQuantity, decreaseQuantity, setQuantity, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showClearModal, setShowClearModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

  // Hitung total harga pakai useMemo (price * quantity)
  const total = useMemo(() => {
    return state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }, [state.items]);

  // Handler hapus item
  const handleDeleteClick = useCallback((id: number) => {
    setSelectedItemId(id);
    setShowDeleteModal(true);
  }, []);

  const handleConfirmDelete = useCallback(() => {
    if (selectedItemId !== null) {
      deleteFromCart(selectedItemId);
      setSelectedItemId(null);
    }
  }, [selectedItemId, deleteFromCart]);

  // Handler clear cart
  const handleClearClick = useCallback(() => {
    setShowClearModal(true);
  }, []);

  // Handler quantity change
  const handleQuantityChange = useCallback((id: number, value: string) => {
    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue >= 1) {
      setQuantity(id, numValue);
    }
  }, [setQuantity]);

  // Handler checkout
  const handleCheckout = useCallback(() => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
    } else {
      navigate("/checkout");
    }
  }, [isAuthenticated, navigate]);

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
          onClick={handleClearClick}
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
                <p className="font-medium">{item.title}</p>
                <p className="text-indigo-600 dark:text-indigo-400 font-bold">
                  ${item.price} {item.quantity > 1 && <span className="text-sm text-gray-500 dark:text-gray-400">(${(item.price * item.quantity).toFixed(2)} total)</span>}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Quantity Controls */}
              <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                <button
                  onClick={() => decreaseQuantity(item.id)}
                  className="w-8 h-8 flex items-center justify-center bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded hover:bg-gray-200 dark:hover:bg-gray-500 transition font-bold"
                >
                  −
                </button>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                  className="w-16 text-center bg-transparent text-gray-900 dark:text-gray-100 font-semibold outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <button
                  onClick={() => increaseQuantity(item.id)}
                  className="w-8 h-8 flex items-center justify-center bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded hover:bg-gray-200 dark:hover:bg-gray-500 transition font-bold"
                >
                  +
                </button>
              </div>

              {/* Delete Button */}
              <button
                onClick={() => handleDeleteClick(item.id)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Remove
              </button>
            </div>
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
        onClick={handleCheckout}
        className="mt-6 w-full py-3 bg-indigo-600 dark:bg-indigo-500 text-white rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition text-lg font-semibold"
      >
        Checkout
      </button>

      {/* Confirmation Modals */}
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        title="Hapus Item?"
        message="Apakah Anda yakin ingin menghapus item ini dari keranjang?"
      />

      <ConfirmModal
        isOpen={showClearModal}
        onClose={() => setShowClearModal(false)}
        onConfirm={clearCart}
        title="Hapus Semua Item?"
        message="Apakah Anda yakin ingin menghapus semua item dari keranjang?"
      />

      <InfoModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        title="Kamu Belum Login"
        message="Silahkan login terlebih dahulu untuk melanjutkan checkout."
        buttonText="Login"
        onButtonClick={() => navigate("/login")}
      />
    </div>
  );
}
