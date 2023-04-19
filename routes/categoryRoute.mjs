import express from "express";
import { createCategory, deleteCategory } from "../controllers/categoryController.mjs";

export const categoryRoute = express.Router();
  // http://localhost:3000/category
  categoryRoute.route("/").post(createCategory);
  categoryRoute.route('/:id').delete(deleteCategory)