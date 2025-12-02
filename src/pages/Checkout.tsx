import { useMemo, useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import InfoModal from "../components/InfoModal";

export default function Checkout() {
  const { state, clearCart } = useCart();
  const navigate = useNavigate();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Hitung total harga
  const total = useMemo(() => {
    return state.items.reduce((sum, item) => sum + item.price, 0);
  }, [state.items]);

  // Jika cart kosong
  if (state.items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-gray-800 dark:text-gray-200">
        <h2 className="text-2xl font-bold mb-4">Keranjang masih kosong 😢</h2>
        <button
          onClick={() => navigate("/products")}
          className="px-4 py-2 bg-indigo-600 dark:bg-indigo-500 text-white rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition"
        >
          Kembali ke Produk
        </button>
      </div>
    );
  }

  const handleConfirm = () => {
    setShowSuccessModal(true);
  };

  const handleSuccessClose = () => {
    clearCart();
    navigate("/products");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-gray-900 dark:text-gray-100">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      {/* List Item */}
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
                  ${item.price}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-between">
        <p className="text-xl font-semibold">Total Pembayaran:</p>
        <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
          ${total.toFixed(2)}
        </p>
      </div>

      {/* Confirm Button */}
      <button
        onClick={handleConfirm}
        className="mt-6 w-full py-3 bg-green-600 dark:bg-green-500 text-white rounded-lg hover:bg-green-700 dark:hover:bg-green-600 transition text-lg font-semibold"
      >
        Confirm Order
      </button>

      <InfoModal
        isOpen={showSuccessModal}
        onClose={handleSuccessClose}
        title="Pesanan Dibuat"
        message="Pesanan Anda telah berhasil dibuat!"
        buttonText="OK"
      />
    </div>
  );
}
