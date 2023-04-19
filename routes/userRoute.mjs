import express from "express";
import {
  createUser,
  deleteUser,
  getDashboardPage,
  loginUser,
  logoutUser,
} from "../controllers/authController.mjs";
import { authMiddleware } from "../middlewares/authMiddleware.mjs";
import { body } from "express-validator";
import { User } from "../modals/User.mjs";

export const userRoute = express.Router();
// http://localhost:3000/users
userRoute.route("/signup").post(
  [
    body("name").not().isEmpty().withMessage("please enter your name"),

    body("email")
      .isEmail()
      .withMessage("please enter valid email")
      .custom((userEmail) => {
        return User.findOne({ email: userEmail }).then((user) => {
          if (user) {
            return Promise.reject("email is already exists!");
          }
        });
      }),

    body("password").not().isEmpty().withMessage("please enter a password"),
  ],
  createUser
);
userRoute.route("/login").post(loginUser);
userRoute.route("/logout").get(logoutUser);
userRoute.route("/dashboard").get(authMiddleware, getDashboardPage);
userRoute.route('/:id').delete(deleteUser)
