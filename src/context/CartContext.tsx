import { createContext, useContext, useReducer } from "react";
import { cartReducer, cartInitialState  } from "../reducers/cartReducer";
import type { CartState, CartItem } from "../reducers/cartReducer"

interface CartContextType {
  state: CartState;
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  deleteFromCart: (id: number) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  setQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, cartInitialState);

  const addToCart = (item: Omit<CartItem, "quantity">) =>
    dispatch({ type: "ADD_ITEM", payload: item });

  const deleteFromCart = (id: number) =>
    dispatch({ type: "DELETE_ITEM", payload: id });

  const increaseQuantity = (id: number) =>
    dispatch({ type: "INCREASE_QUANTITY", payload: id });

  const decreaseQuantity = (id: number) =>
    dispatch({ type: "DECREASE_QUANTITY", payload: id });

  const setQuantity = (id: number, quantity: number) =>
    dispatch({ type: "SET_QUANTITY", payload: { id, quantity } });

  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  return (
    <CartContext.Provider value={{ state, addToCart, deleteFromCart, increaseQuantity, decreaseQuantity, setQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}
