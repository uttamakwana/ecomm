import express from "express";
import {
  createOrder,
  deleteOrder,
  getAllOrders,
  getAllOrdersWithTotalAmount,
  getSingleOrder,
  updateOrderStatus,
} from "../controllers/order.js";
import { authorizeRole, isUserAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// routers for getting all order's details for an user
router.get("/all", isUserAuthenticated, getAllOrders);
// routes for creating a new order
router.post("/create", isUserAuthenticated, createOrder);
// route for getting single order details
router.get("/:id", isUserAuthenticated, getSingleOrder);
// route for getting all order details with total price for an admin
router.get(
  "/all/total",
  isUserAuthenticated,
  authorizeRole("admin"),
  getAllOrdersWithTotalAmount
);
// router for update an order status and stock
router.put(
  "/:id",
  isUserAuthenticated,
  authorizeRole("admin"),
  updateOrderStatus
);

// router for delete an order
router.delete("/:id", isUserAuthenticated, authorizeRole("admin"), deleteOrder);

export default router;
