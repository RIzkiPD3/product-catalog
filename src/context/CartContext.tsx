import { createContext, useContext, useReducer } from "react";
import { cartReducer, cartInitialState  } from "../reducers/cartReducer";
import type { CartState, CartItem } from "../reducers/cartReducer"

interface CartContextType {
  state: CartState;
  addToCart: (item: CartItem) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, cartInitialState);

  const addToCart = (item: CartItem) =>
    dispatch({ type: "ADD_ITEM", payload: item });

  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  return (
    <CartContext.Provider value={{ state, addToCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}
