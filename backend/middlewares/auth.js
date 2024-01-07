import jwt from "jsonwebtoken";
import catchAsyncError from "./catchAsyncError.js";
import { ErrorHandler } from "./errorHandler.js";
import User from "../models/user.js";

export const isUserAuthenticated = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) return next(new ErrorHandler("Login required!", 403));
  const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.user = await User.findById(decodedData.id);
  return next();
});

export const authorizeRole = (...role) => {
  return (req, res, next) => {
    if (!role.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role ${req.user.role} can't access the resources`,
          403
        )
      );
    }
    return next();
  };
};
