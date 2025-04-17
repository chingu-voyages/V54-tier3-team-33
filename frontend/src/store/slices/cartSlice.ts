import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {CartItem , Product} from "./productTypes";

interface CartState {
  items: CartItem[];
}
const savedCart = localStorage.getItem('cart');

const initialState: CartState = savedCart
    ? JSON.parse(savedCart)
    : { items: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(item => item.product.id == action.payload.id);
      if(existingItem) {
         existingItem.quantity +=1;
      }else {
         state.items.push({product: action.payload, quantity: 1})
      }
    },
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const itemIndex = state.items.findIndex(item => item.product.id === action.payload);

      if (itemIndex !== -1) {
        const item = state.items[itemIndex];

        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.items.splice(itemIndex, 1);
        }
      }
    },
    increaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find(item => item.product.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    removeItemFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.product.id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
} = cartSlice.actions;

export default cartSlice.reducer;
