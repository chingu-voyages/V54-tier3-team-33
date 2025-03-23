import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import fetchProducts from "../../services/localProductService";
import { Product, ProductState } from "./productTypes";

const initialState: ProductState = {
  products: [],
  searchResults: [],
  loading: false,
  error: null,
};

export const loadProducts = createAsyncThunk<Product[], void>(
  "products/loadProducts",
  async () => {
    const products = await fetchProducts() as Product[]; 
    return products;
  }
);

const localProductSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    searchProducts: (state, action: PayloadAction<{ query: string; category: string }>) => {
      const { query, category } = action.payload;
      if (query === "" && category === "") {
        state.searchResults = []; 
      } else {
        state.searchResults = state.products.filter((product) => {
          const matchesQuery = query === "" || product.name.toLowerCase().includes(query.toLowerCase());
          const matchesCategory = category === "" || product.category === category;
          return matchesQuery && matchesCategory;
        });
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(loadProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load products";
      });
  },
});

export const { searchProducts } = localProductSlice.actions;

export default localProductSlice.reducer;