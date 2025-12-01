export interface CartItem {
    id: number;
    title: string;
    price: number;
    image: string;
  }
  
  export interface CartState {
    items: CartItem[];
    total: number;
  }
  
  export type CartAction =
    | { type: "ADD_ITEM"; payload: CartItem }
    | { type: "REMOVE_ITEM"; payload: number }
    | { type: "CLEAR_CART" };
  
  export const cartInitialState: CartState = {
    items: [],
    total: 0,
  };
  
  export function cartReducer(state: CartState, action: CartAction): CartState {
    switch (action.type) {
      case "ADD_ITEM":
        return {
          items: [...state.items, action.payload],
          total: state.total + 1,
        };
  
      case "REMOVE_ITEM":
        return {
          items: state.items.filter(item => item.id !== action.payload),
          total: state.total - 1,
        };
  
      case "CLEAR_CART":
        return cartInitialState;
  
      default:
        return state;
    }
  }
  