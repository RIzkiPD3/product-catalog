export interface CartItem {
    id: number;
    title: string;
    price: number;
    image: string;
    quantity: number;
  }
  
  export interface CartState {
    items: CartItem[];
    total: number;
  }
  
  export type CartAction =
    | { type: "ADD_ITEM"; payload: Omit<CartItem, "quantity"> }
    | { type: "REMOVE_ITEM"; payload: number }
    | { type: "CLEAR_CART" };
  
  export const cartInitialState: CartState = {
    items: [],
    total: 0,
  };
  
  export function cartReducer(state: CartState, action: CartAction): CartState {
    switch (action.type) {
      case "ADD_ITEM":
        // Check if item already exists in cart
        const existingItemIndex = state.items.findIndex(
          item => item.id === action.payload.id
        );
        
        if (existingItemIndex !== -1) {
          // Item exists, increment quantity
          const updatedItems = [...state.items];
          updatedItems[existingItemIndex] = {
            ...updatedItems[existingItemIndex],
            quantity: updatedItems[existingItemIndex].quantity + 1,
          };
          
          return {
            items: updatedItems,
            total: state.total + 1,
          };
        } else {
          // Item doesn't exist, add new item with quantity 1
          return {
            items: [...state.items, { ...action.payload, quantity: 1 }],
            total: state.total + 1,
          };
        }
  
      case "REMOVE_ITEM":
        const itemIndex = state.items.findIndex(item => item.id === action.payload);
        if (itemIndex === -1) return state;
        
        const item = state.items[itemIndex];
        
        if (item.quantity > 1) {
          // Decrease quantity
          const updatedItems = [...state.items];
          updatedItems[itemIndex] = {
            ...item,
            quantity: item.quantity - 1,
          };
          
          return {
            items: updatedItems,
            total: state.total - 1,
          };
        } else {
          // Remove item completely
          const newItems = state.items.filter((_, index) => index !== itemIndex);
          
          return {
            items: newItems,
            total: state.total - 1,
          };
        }
  
      case "CLEAR_CART":
        return cartInitialState;
  
      default:
        return state;
    }
  }
  