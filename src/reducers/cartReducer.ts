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
    | { type: "DELETE_ITEM"; payload: number }
    | { type: "INCREASE_QUANTITY"; payload: number }
    | { type: "DECREASE_QUANTITY"; payload: number }
    | { type: "SET_QUANTITY"; payload: { id: number; quantity: number } }
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
  
      case "DELETE_ITEM":
        // Completely remove item from cart
        const deleteIndex = state.items.findIndex(item => item.id === action.payload);
        if (deleteIndex === -1) return state;
        
        const deletedItem = state.items[deleteIndex];
        const newItems = state.items.filter((_, index) => index !== deleteIndex);
        
        return {
          items: newItems,
          total: state.total - deletedItem.quantity,
        };
  
      case "INCREASE_QUANTITY":
        const increaseIndex = state.items.findIndex(item => item.id === action.payload);
        if (increaseIndex === -1) return state;
        
        const increasedItems = [...state.items];
        increasedItems[increaseIndex] = {
          ...increasedItems[increaseIndex],
          quantity: increasedItems[increaseIndex].quantity + 1,
        };
        
        return {
          items: increasedItems,
          total: state.total + 1,
        };
  
      case "DECREASE_QUANTITY":
        const decreaseIndex = state.items.findIndex(item => item.id === action.payload);
        if (decreaseIndex === -1) return state;
        
        const decreaseItem = state.items[decreaseIndex];
        
        if (decreaseItem.quantity > 1) {
          // Decrease quantity
          const decreasedItems = [...state.items];
          decreasedItems[decreaseIndex] = {
            ...decreaseItem,
            quantity: decreaseItem.quantity - 1,
          };
          
          return {
            items: decreasedItems,
            total: state.total - 1,
          };
        } else {
          // Remove item if quantity becomes 0
          const filteredItems = state.items.filter((_, index) => index !== decreaseIndex);
          
          return {
            items: filteredItems,
            total: state.total - 1,
          };
        }
  
      case "SET_QUANTITY":
        const setIndex = state.items.findIndex(item => item.id === action.payload.id);
        if (setIndex === -1) return state;
        
        const currentItem = state.items[setIndex];
        const newQuantity = Math.max(1, action.payload.quantity); // Minimum 1
        const quantityDiff = newQuantity - currentItem.quantity;
        
        const setItems = [...state.items];
        setItems[setIndex] = {
          ...currentItem,
          quantity: newQuantity,
        };
        
        return {
          items: setItems,
          total: state.total + quantityDiff,
        };
  
      case "CLEAR_CART":
        return cartInitialState;
  
      default:
        return state;
    }
  }
  