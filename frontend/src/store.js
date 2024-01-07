import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./app/slice/productReducer.js";

const store = configureStore({
  reducer: { products: productReducer },
});

export default store;
