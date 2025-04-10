import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import fetchProducts from "../../services/productService";
import { Product, ProductState } from "./productTypes";
import { RootState } from "../store";

const initialState: ProductState = {
  products: [],
  searchResults: [],
  totalPages: 0,
  loading: false,
  error: null,
  searchQuery: "",
};

export const loadProducts = createAsyncThunk<
  { products: Product[]; totalPages: number; page: number },
  { page: number; limit: number },
  { state: RootState } // Access the Redux state
>("products/loadProducts", async ({ page, limit }, { getState }) => {
  const state = getState();
  const search = state.products.searchQuery; // Get the search query from the Redux state

  const data = await fetchProducts(search, page, limit);
  return data;
});

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload; // Update the search query in the state
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadProducts.pending, (state) => {
        // console.log("Reducer: loadProducts.pending");
        state.loading = true;
        state.error = null;
      })
      .addCase(loadProducts.fulfilled, (state, action) => {
        // console.log("Reducer: loadProducts.fulfilled", action.payload);
        state.products = action.payload.products;
        state.totalPages = action.payload.totalPages;
        state.loading = false;
      })
      .addCase(loadProducts.rejected, (state, action) => {
        // console.log("Reducer: loadProducts.rejected", action.error.message);
        state.loading = false;
        state.error = action.error.message || "Failed to load products";
      });
  },
});

export const { setSearchQuery } = productSlice.actions; //
export default productSlice.reducer;
