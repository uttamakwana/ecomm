import { createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../api/Api.js";

// fetch all the products from the database
export const fetchAsyncProducts = createAsyncThunk(
  "products/fetchAsyncProducts",
  async ({ keyword = "", currentPage = 1, price = [0, 50000] }) => {
    console.log(currentPage, keyword);
    const response = await Api.get(
      `product/all?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}`
    ).catch((err) => console.log(err));
    return response.data;
  }
);

export const fetchProductDetails = createAsyncThunk(
  "products/fetchProductDetails",
  async (id) => {
    try {
      const response = await Api.get(`product/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);
