import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import fetchProducts from "../../services/productService";
import { Product, ProductState } from "./productTypes";

const initialState: ProductState = {
  products: [],
  searchResults: [],
  totalPages: 0,
  loading: false,
  error: null,
};

export const loadProducts = createAsyncThunk<
  { products: Product[]; totalPages: number; page: number },
  { page: number; limit: number }
>("products/loadProducts", async ({ page, limit }) => {
  const data = await fetchProducts(page, limit);

  return data;
});

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
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

export default productSlice.reducer;
