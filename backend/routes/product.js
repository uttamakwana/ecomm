import express from "express";
import {
  createProduct,
  createProductReview,
  deleteProduct,
  deleteReview,
  getAllProducts,
  getAllReviews,
  getProductDetails,
  updateProduct,
} from "../controllers/product.js";
import { authorizeRole, isUserAuthenticated } from "../middlewares/auth.js";

// creating a router for product APIs
const router = express.Router();

// get all products router
router.get("/all", getAllProducts);
//! Admin route
// create a new product router
router.post(
  "/create",
  isUserAuthenticated,
  authorizeRole("admin"),
  createProduct
);
//! Admin route
// to update a product router
router.put(
  "/update/:id",
  isUserAuthenticated,
  authorizeRole("admin"),
  updateProduct
);
//! Admin router
// to delete a product router
router.delete(
  "/delete/:id",
  isUserAuthenticated,
  authorizeRole("admin"),
  deleteProduct
);
// to get product details
router.get("/:id", getProductDetails);
// to create or update a review
router.post("/review/create", isUserAuthenticated, createProductReview);
// to get all review of a product
router.get("/review/all/:id", getAllReviews);
// to delete a review of a product
router.delete(
  "/review/delete/:id",
  isUserAuthenticated,
  authorizeRole("admin"),
  deleteReview
);

export default router;
