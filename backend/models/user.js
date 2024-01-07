import mongoose from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const User = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
    maxLength: [30, "Name must not exceed 30 characters"],
    minLength: [4, "Name must be at least 4 characters"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email address"],
    unique: [true, "User already exists!"],
    validate: [validator.isEmail, "Please enter a valid email address"],
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minLength: [4, "Password must be at least 4 characters"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },

  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

// generating token
User.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_TOKEN_EXPIRATION,
  });
};

// reset password functionality
User.methods.resetPasswordTokenGeneration = function () {
  // generating token
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  return resetToken;
};

export default mongoose.model("users", User);
