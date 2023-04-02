import express from "express";
import { router } from "./routes/pageRoute.mjs";
import { courseRoute } from "./routes/courseRoute.mjs";
import mongoose from "mongoose";

const app = express();

const port = 3000;
// connect db

mongoose.connect("mongodb://localhost/smartedu-db");

// template engine

app.set("view engine", "ejs");

// Middlewares

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/", router);
app.use("/courses", courseRoute);

app.listen(port, () => {
  console.log(`App is up on port : ${port}`);
});
