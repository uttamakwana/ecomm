import { createSlice } from "@reduxjs/toolkit";
import { fetchAsyncProducts, fetchProductDetails } from "../actions/productAction";

const initialState = {
  message: "",
  productsCount: 0,
  products: [],
  loader: false,
  // for a particular product detail
  // http://localhost:4000/api/v1/product/:id
  product: {},
  productDetailLoader: false,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsyncProducts.pending, (state) => {
        console.log("Products Pending!");
        state.loader = true; // Correct way to update the loader state
      })
      .addCase(fetchAsyncProducts.fulfilled, (state, action) => {
        console.log("Products Fetched successfully!");
        state.loader = false;
        state.message = action.payload.message;
        state.products = action.payload.products;
        state.productsCount = action.payload.productsCount;
      })
      .addCase(fetchAsyncProducts.rejected, (state) => {
        console.log("Products does not fetched successfully!");
        state.loader = false;
      })
      .addCase(fetchProductDetails.pending, (state) => {
        console.log("Product detail pending!");
        state.productDetailLoader = true; // Correct way to update the loader state
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        console.log("Product detail fetched successfully!");
        state.productDetailLoader = false;
        state.product = action.payload.product;
      })
      .addCase(fetchProductDetails.rejected, (state) => {
        console.log("Products does not fetched successfully!");
        state.productDetailLoader = false;
      });
  },
});

export default productSlice.reducer;
