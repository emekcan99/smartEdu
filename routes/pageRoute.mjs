import express from "express";
import {
  getAboutPage,
  getContactPage,
  getIndexPage,
  getLoginPage,
  getRegisterPage,
  sendEmail,
} from "../controllers/pageController.mjs";
import { redirect } from "../middlewares/redirect.mjs";

export const router = express.Router();

router.route("/").get(getIndexPage);
router.route("/about").get(getAboutPage);
router.route("/register").get(redirect, getRegisterPage);
router.route("/login").get(redirect, getLoginPage);
router.route("/contact").get(getContactPage);
router.route("/contact").post(sendEmail);
