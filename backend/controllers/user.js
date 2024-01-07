import { ErrorHandler } from "../middlewares/errorHandler.js";
import catchAsyncError from "../middlewares/catchAsyncError.js";
import User from "../models/user.js";
// importing bcrypt to encrypt the password
import bcrypt from "bcrypt";
import { sendToken } from "../utils/token.js";
import { sendEmail } from "../utils/sendEmail.js";
import crypto from "crypto";

// POST
// @desc: registerUser controller will register a new user
export const registerUser = catchAsyncError(async (req, res, next) => {
  const { password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 5);
  const user = await User.create({ ...req.body, password: hashedPassword });
  sendToken(200, "User registered successfully", res, user);
});

// GET
// @desc: loginUser controller will login an user
export const loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new ErrorHandler("Please enter email or password!", 400));
  const user = await User.findOne({ email }).select("+password");
  if (!user) return next(new ErrorHandler("Invalid password or email!", 400));
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect)
    return next(new ErrorHandler("Invalid password or email", 400));
  sendToken(200, "User Logged in successfully", res, user);
});

// GET
// @desc: logOutUser controller will log out an user
export const logOutUser = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res
    .status(200)
    .json({ success: true, message: "User logged out successfully" });
});

//
// @desc: forget password controller
export const forgetPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return next(new ErrorHandler("Invalid password or email", 400));

  const resetToken = user.resetPasswordTokenGeneration();
  await user.save({ validateBeforeSave: false });

  const resetPasswordURL = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/user/password/reset/${resetToken}`;

  const message = `Your password reset token is:- \n\n${resetPasswordURL}\n\nIf you have not requested this email then, please ignore it`;
  try {
    await sendEmail({
      email: user.email,
      subject: "E-commerce password recovery",
      message,
    });
    res.status(200).json({
      sucess: true,
      message: `Email send to ${user.email} successfully`,
      token: resetToken,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message, 500));
  }
});

//POST
// @desc: resetPasswod will reset the password
export const resetPasswod = catchAsyncError(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user)
    return next(new ErrorHandler("Invalid reset token or expired!", 400));

  if (!req.body.password === req.body.confirmPassword) {
    return next(new ErrorHandler("Password must be same", 400));
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  user.password = hashedPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save({ validateBeforeSave: false });
  sendToken(200, "Password changed successfuly!", res, user);
});

// GET
// @desc: this controller will get the user information

export const getUserDetails = catchAsyncError(async (req, res, next) => {
  return res.status(200).json({
    success: true,
    message: "User information retrieved successfully",
    user: req.user,
  });
});

// PUT
// @desc: this controller will update the user password

export const updateUserPassword = catchAsyncError(async (req, res, next) => {
  const { oldPassword, password, confirmPassword } = req.body;
  const user = await User.findById(req.user.id).select("+password");
  const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);
  if (!isPasswordCorrect)
    return next(new ErrorHandler("Your old password is incorrect", 400));

  if (password === oldPassword) {
    return next(new ErrorHandler("You can't set your old password", 400));
  }
  if (password !== confirmPassword)
    return next(new ErrorHandler("Password must be same", 400));

  const hashedPassword = await bcrypt.hash(password, 10);
  user.password = hashedPassword;
  await user.save();
  sendToken(200, "Password updated successfully!", res, user);
});

// PUT
// @desc: this controller will update the profile
export const updateProfile = catchAsyncError(async (req, res, next) => {
  let user = await User.findById(req.user.id);
  if (!user) return next(new ErrorHandler("User not found!", 400));
  user = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email,
    },
    { new: true, runValidators: true, useFindAndModify: false }
  );
  return res
    .status(200)
    .json({ sucess: true, message: "Profile updated successfully!", user });
});

// GET
// @desc: this controller will get all the user
export const getAllUsers = catchAsyncError(async (req, res, next) => {
  const users = await User.find();

  return res.status(200).json({
    sucess: true,
    message: "All users retrieved successfully!",
    users,
  });
});

// GET
// @desc: this controller will get a single user
export const getUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) return next(new ErrorHandler("User not found!", 400));

  return res
    .status(200)
    .json({ sucess: true, message: "User retrieved successfully!", user });
});

// PUT
export const updateUser = catchAsyncError(async (req, res, next) => {
  let user = await User.findById(req.params.id);
  if (!user) return next(new ErrorHandler("User not found!", 400));
  console.log(user);
  user = await User.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
    },
    { new: true, runValidators: true, useFindAndModify: false }
  );
  return res
    .status(200)
    .json({ sucess: true, message: "Profile updated successfully!", user });
});

// DELETE
// @desc: this controller will delete an user
export const deleteUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) return next(new ErrorHandler("User not found!", 400));

  await user.deleteOne();
  return res
    .status(200)
    .json({ sucess: true, message: "User deleted successfully!", user });
});
