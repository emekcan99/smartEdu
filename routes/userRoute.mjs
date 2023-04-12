import express from "express";
import {
  createUser,
  getDashboardPage,
  loginUser,
  logoutUser,
} from "../controllers/authController.mjs";

export const userRoute = express.Router();
// http://localhost:3000/users
userRoute.route("/signup").post(createUser);
userRoute.route("/login").post(loginUser);
userRoute.route("/logout").get(logoutUser);
userRoute.route("/dashboard").get(getDashboardPage);
