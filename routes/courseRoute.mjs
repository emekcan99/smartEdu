import express from "express";
import {
  createCourse,
  getAllCourses,
} from "../controllers/courseController.mjs";

export const courseRoute = express.Router();
  // http://localhost:3000/courses
courseRoute.route("/").post(createCourse);
courseRoute.route("/").get(getAllCourses);
