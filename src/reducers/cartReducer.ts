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
        // Find the index of the first item with matching ID
        const indexToRemove = state.items.findIndex(item => item.id === action.payload);
        if (indexToRemove === -1) return state;
        
        // Create a new array and remove only that one item
        const newItems = [...state.items];
        newItems.splice(indexToRemove, 1);
        
        return {
          items: newItems,
          total: state.total - 1,
        };
  
      case "CLEAR_CART":
        return cartInitialState;
  
      default:
        return state;
    }
  }
  