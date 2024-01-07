import catchAsyncError from "../middlewares/catchAsyncError.js";
import Order from "../models/order.js";
import Product from "../models/product.js";
import ErrorHandler from "../middlewares/errorHandler.js";

// POST
// @desc: Create a order
export const createOrder = catchAsyncError(async (req, res, next) => {
  const {
    shippingInfo,
    orderdItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderdItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  return res.status(200).json({
    success: true,
    message: "Product ordered successfully!",
    order,
  });
});

// GET
// @desc: Get all order's details
export const getAllOrders = catchAsyncError(async (req, res, next) => {
  // here we are finding all the order made by a particular user
  const orders = await Order.find({ user: req.user._id });
  return res
    .status(200)
    .json({ success: true, message: "Orders retrieved successfully!", orders });
});

// GET
// @desc: Get a single order details
export const getSingleOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (!order) return next(new ErrorHandler("Order not found!", 400));

  return res
    .status(200)
    .json({ success: true, message: "Order retrieved successfully", order });
});

// GET
// @desc: Get all order's details with totalAmount

export const getAllOrdersWithTotalAmount = catchAsyncError(
  async (req, res, next) => {
    const orders = await Order.find();
    let totalAmount = 0;
    orders.forEach((order) => (totalAmount += order.totalPrice));
    return res.status(200).json({ sucess: true, totalAmount, orders });
  }
);

// PUT
// @desc: Update status of an order

export const updateOrderStatus = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) return next(new ErrorHandler("Order not found!", 400));
  if (order.orderStatus === "Delivered") {
    return res
      .status(400)
      .json({ success: false, message: "Order has already been delivered" });
  }
  order.orderdItems.forEach((product) => {
    updateStock(product.product, product.quantity);
  });

  order.orderStatus = req.body.status;
  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });
  return res
    .status(200)
    .json({ sucess: true, message: "Order updated successfully", order });
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);
  console.log("ffirst");
  console.log("This is our product", product);
  product.stock -= quantity;
  await product.save({ validateBeforeSave: false });
}

// DELETE
// @desc: delete an order
export const deleteOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) return next(new ErrorHandler("Order not found", 400));

  await order.deleteOne();

  return res
    .status(200)
    .json({ sucess: true, message: "Order deleted successfully", order });
});
