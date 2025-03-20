import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "./productTypes";

interface CartState {
  items: Product[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<Product>) => {
      state.items.push(action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItemToCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;