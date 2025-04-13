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

  const data = await productService.fetchProducts(
    search,
    page,
    limit,
    category,
    subcategory,
  );

  console.log(category, subcategory);
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
      console.log("Category set to:", action.payload);
    },
    setSubcategory: (state, action) => {
      state.subcategory = action.payload;
      console.log("Subcategory set to:", action.payload);
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

export const { setSearchQuery, setCategory, setSubcategory } =
  productSlice.actions; //
export default productSlice.reducer;
