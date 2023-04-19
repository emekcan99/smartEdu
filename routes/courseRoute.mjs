import express from "express";
import {
  createCourse,
  deleteCourse,
  enrollCourse,
  getAllCourses,
  getCourse,
  releaseCourse,
  updateCourse,
} from "../controllers/courseController.mjs";
import { roleMiddleware } from "../middlewares/roleMiddleware.mjs";

export const courseRoute = express.Router();
// http://localhost:3000/courses
courseRoute.route("/").post(roleMiddleware(["teacher", "admin"]), createCourse);
courseRoute.route("/").get(getAllCourses);
courseRoute.route("/:slug").get(getCourse);
courseRoute.route("/:slug").delete(deleteCourse);
courseRoute.route("/:slug").put(updateCourse);
courseRoute.route("/enroll").post(enrollCourse);
courseRoute.route("/release").post(releaseCourse);
