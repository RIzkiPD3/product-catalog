import { useMemo, useCallback, useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ConfirmModal from "../components/ConfirmModal";
import InfoModal from "../components/InfoModal";

export default function Cart() {
  const { state, deleteFromCart, increaseQuantity, decreaseQuantity, setQuantity, clearCart, toggleSelection, selectAll, deselectAll } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showClearModal, setShowClearModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);


  // Calculate selected items
  const selectedItems = useMemo(() => state.items.filter(item => item.selected), [state.items]);
  const allSelected = useMemo(() => state.items.length > 0 && state.items.every(item => item.selected), [state.items]);
  const hasSelectedItems = selectedItems.length > 0;

  // Calculate total for selected items only
  const total = useMemo(() => {
    return selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }, [selectedItems]);

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


  // Handler select all toggle
  const handleSelectAllToggle = useCallback(() => {
    if (allSelected) {
      deselectAll();
    } else {
      selectAll();
    }
  }, [allSelected, selectAll, deselectAll]);

  // Handler checkout
  const handleCheckout = useCallback(() => {
    if (!hasSelectedItems) {
      alert("Pilih minimal satu produk untuk checkout");
      return;
    }
    if (!isAuthenticated) {
      setShowLoginModal(true);
    } else {
      navigate("/checkout");
    }
  }, [hasSelectedItems, isAuthenticated, navigate]);

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
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-2xl sm:text-3xl font-bold">Your Cart</h1>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={allSelected}
              onChange={handleSelectAllToggle}
              className="w-5 h-5 cursor-pointer accent-indigo-600"
            />
            <span className="text-sm font-medium">Select All</span>
          </label>
        </div>
        <button
          onClick={handleClearClick}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-medium text-sm sm:text-base"
        >
          Remove All
        </button>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {state.items.map((item) => (
          <div
            key={item.id}
            className={`flex flex-col sm:flex-row bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-xl shadow border transition-all gap-3 ${
              item.selected 
                ? 'border-indigo-500 dark:border-indigo-400' 
                : 'border-gray-200 dark:border-gray-700 opacity-60'
            }`}
          >
            {/* Top section: checkbox, image, title, price */}
            <div className="flex items-start gap-3 flex-1">
              {/* Checkbox */}
              <input
                type="checkbox"
                checked={item.selected}
                onChange={() => toggleSelection(item.id)}
                className="w-5 h-5 mt-1 cursor-pointer accent-indigo-600 flex-shrink-0"
              />
              
              <img
                src={item.image}
                alt={item.title}
                className="w-14 h-14 sm:w-16 sm:h-16 object-contain rounded flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm sm:text-base line-clamp-2">{item.title}</p>
                <p className="text-indigo-600 dark:text-indigo-400 font-bold text-sm sm:text-base mt-1">
                  ${item.price}
                </p>
                {item.quantity > 1 && (
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                    Total: ${(item.price * item.quantity).toFixed(2)}
                  </p>
                )}
              </div>
            </div>

            {/* Bottom section: quantity controls and remove button */}
            <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-3 sm:flex-shrink-0">
              {/* Quantity Controls */}
              <div className="flex items-center gap-1 sm:gap-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                <button
                  onClick={() => decreaseQuantity(item.id)}
                  className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded hover:bg-gray-200 dark:hover:bg-gray-500 transition font-bold text-sm sm:text-base"
                >
                  −
                </button>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                  className="w-12 sm:w-14 text-center bg-transparent text-gray-900 dark:text-gray-100 font-semibold outline-none text-sm sm:text-base [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <button
                  onClick={() => increaseQuantity(item.id)}
                  className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded hover:bg-gray-200 dark:hover:bg-gray-500 transition font-bold text-sm sm:text-base"
                >
                  +
                </button>
              </div>

              {/* Delete Button */}
              <button
                onClick={() => handleDeleteClick(item.id)}
                className="px-3 py-1.5 sm:px-4 sm:py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-xs sm:text-sm font-medium"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>


      <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-gray-100 dark:bg-gray-700 rounded-xl">
        <div className="flex items-center justify-between">
          <p className="text-sm sm:text-base font-semibold">
            Total ({selectedItems.length} item{selectedItems.length !== 1 ? 's' : ''})
          </p>
          <p className="text-xl sm:text-2xl font-bold text-indigo-600 dark:text-indigo-400">
            ${total.toFixed(2)}
          </p>
        </div>
      </div>

      <button
        onClick={handleCheckout}
        disabled={!hasSelectedItems}
        className={`mt-4 sm:mt-6 w-full py-3 sm:py-3.5 rounded-lg transition text-base sm:text-lg font-semibold ${
          hasSelectedItems
            ? 'bg-indigo-600 dark:bg-indigo-500 text-white hover:bg-indigo-700 dark:hover:bg-indigo-600'
            : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
        }`}
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
