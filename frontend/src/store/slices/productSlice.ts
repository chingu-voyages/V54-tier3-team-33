import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "../../services/productService";
import { Product, ProductState } from "./productTypes";
import { RootState } from "../store";

const initialState: ProductState = {
  products: [],
  searchResults: [],
  totalPages: 0,
  loading: false,
  error: null,
  searchQuery: "",
  category: "",
  subcategory: "",
  minPrice: 0,
  maxPrice: 999999,
  sort: "default"
};

export const loadProducts = createAsyncThunk<
  { products: Product[]; totalPages: number; page: number },
  { page: number; limit: number },
  { state: RootState }
>("products/loadProducts", async ({ page, limit }, { getState }) => {
  const state = getState();
  const search = state.products.searchQuery;
  const category = state.products.category;
  const subcategory = state.products.subcategory;
  const minPrice = state.products.minPrice;
  const maxPrice = state.products.maxPrice;
  const sort = state.products.sort;
  const sortKey = sort == "default" ? "" : sort
  const data = await productService.fetchProducts(
    search,
    page,
    limit,
    category,
    subcategory,
    minPrice,
    maxPrice, sortKey
  );
  return data;
});

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setSubcategory: (state, action) => {
      state.subcategory = action.payload;
    },
    setMinPrice: (state, action) => {
      state.minPrice = action.payload;
    },
    setMaxPrice: (state, action) => {
      state.maxPrice = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loadProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadProducts.fulfilled, (state, action) => {
        state.products = action.payload.products;
        state.totalPages = action.payload.totalPages;
        state.loading = false;
      })
      .addCase(loadProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load products";
      });
  },
});

export const {
  setSearchQuery,
  setCategory,
  setSubcategory,
  setMinPrice,
  setMaxPrice,
    setSort
} = productSlice.actions;
export default productSlice.reducer;
