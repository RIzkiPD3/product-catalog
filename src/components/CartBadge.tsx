import { useCart } from "../context/CartContext";

export default function CartBadge() {
  const { state } = useCart();

  return (
    <div className="fixed top-5 right-5 bg-indigo-600 text-white px-4 py-2 rounded-full shadow-md">
      Cart: {state.total}
    </div>
  );
}
