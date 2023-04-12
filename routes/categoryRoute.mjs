import express from "express";
import { createCategory } from "../controllers/categoryController.mjs";

export const categoryRoute = express.Router();
  // http://localhost:3000/category
  categoryRoute.route("/").post(createCategory);
