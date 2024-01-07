import express from "express";
import {
  deleteUser,
  forgetPassword,
  getAllUsers,
  getUser,
  getUserDetails,
  logOutUser,
  loginUser,
  registerUser,
  resetPasswod,
  updateProfile,
  updateUser,
  updateUserPassword,
} from "../controllers/user.js";
import { authorizeRole, isUserAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// router for user registration
router.post("/register", registerUser);
// router for user login
router.post("/login", loginUser);
// router for user logout
router.get("/logout", logOutUser);
// router for user forgot password
router.post("/password/forgot", forgetPassword);
// router for user reset password
router.put("/password/reset/:token", resetPasswod);
// router for user details
router.get("/profile", isUserAuthenticated, getUserDetails);
// router for user update
router.put("/password/update", isUserAuthenticated, updateUserPassword);
// router for user update profile
router.put("/profile/update", isUserAuthenticated, updateProfile);
// router for getting all users
router.get("/all", isUserAuthenticated, authorizeRole("admin"), getAllUsers);
// router for getting single user only
router.get("/:id", isUserAuthenticated, authorizeRole("admin"), getUser);
// router for updating the role of a user
router.put("/update/:id", isUserAuthenticated, authorizeRole("admin"), updateUser);
// router for deleting the user
router.delete("/delete/:id", isUserAuthenticated, authorizeRole("admin"), deleteUser);

export default router;
