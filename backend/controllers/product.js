// importing Product model
import { ErrorHandler } from "../middlewares/errorHandler.js";
import Product from "../models/product.js";
import catchAsyncError from "../middlewares/catchAsyncError.js";
import ProductFeatures from "../utils/productFeatures.js";
import { ObjectId } from "mongodb";

// GET
// @desc: This controller will get all the product
export const getAllProducts = catchAsyncError(async (req, res) => {
  // const products = await Product.find();
  const productsPerPage = 10;
  const productsCount = await Product.countDocuments();
  const productFeature = new ProductFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(productsPerPage);
  const products = await productFeature.query;
  return res.status(200).json({
    sucess: true,
    message: "Products retrieved successfully!",
    products,
    productsCount,
  });
});

// POST
// @desc: This controller will create a new product
//! Private
//! Admin Controller
export const createProduct = catchAsyncError(async (req, res) => {
  req.body.user = req.user._id;
  const product = await Product.create(req.body);
  return res
    .status(200)
    .json({ sucess: true, message: "Product created successfully", product });
});

// PUT
// @desc: This controller will update an existing product
//! Private
//! Admin Controller
export const updateProduct = catchAsyncError(async (req, res, next) => {
  req.body.user = req.user._id;
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  return res.status(200).json({
    success: true,
    message: "Product updated successfully",
    product,
  });
});

// DELETE
// @desc: This controller will delete a product
//! Private
//! Admin controller
export const deleteProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  await product.deleteOne();
  return res
    .status(200)
    .json({ success: true, message: "Product deleted successfully" });
});

// GET
// @desc: This controller will get a product details

export const getProductDetails = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  return res.status(200).json({ success: true, product });
});

// POST
// @desc: This controller will post a product review
export const createProductReview = catchAsyncError(async (req, res, next) => {
  const { rating, comment, productID } = req.body;
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productID);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((r) => {
      if (r.user.toString() === review.user.toString()) {
        console.log(r.user, review.user);
        r.rating = rating;
        r.comment = comment;
      }
    });
  } else {
    product.reviews.push(review);
    product.numberOfReviews = product.reviews.length;
  }

  let sum = 0;
  product.reviews.forEach((review) => (sum += review.rating));
  product.ratings = sum / product.reviews.length;

  await product.save({ validateBeforeSave: false });
  return res
    .status(200)
    .json({ sucess: true, message: "Product reviewd successfully", review });
});

// GET
// @desc: this controller will get all the reviews
export const getAllReviews = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) return next(new ErrorHandler("Sorry! no product found", 400));

  return res.status(200).json({
    sucess: true,
    message: "Product review retrieved successfully!",
    reviews: product.reviews,
  });
});

// DELETE
// @desc: this controller will delete all the reviews
export const deleteReview = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) return next(new ErrorHandler("Product not found!", 400));

  const queryId = ObjectId.isValid(req.query.id)
    ? new ObjectId(req.query.id)
    : req.query.id;

  // Filter the reviews based on _id (both as ObjectId)
  const reviews = product.reviews.filter((review) => {
    return review._id.toString() !== queryId.toString();
  });
  let sum = 0;
  reviews.forEach((review) => (sum += review.rating));

  console.log(sum);
  const ratings = reviews.length === 0 ? 0 : sum / reviews.length;
  console.log(ratings);
  const numberOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.params.id,
    {
      reviews,
      ratings,
      numberOfReviews,
    },
    { new: true, useFindAndModify: false, runValidators: true }
  );

  return res.status(200).json({
    sucess: true,
    message: "Review deleted successfully!",
    reviews,
  });
});
