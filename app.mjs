import express from "express";
import { router } from "./routes/pageRoute.mjs";
import { courseRoute } from "./routes/courseRoute.mjs";
import mongoose from "mongoose";
import { categoryRoute } from "./routes/categoryRoute.mjs";
import { userRoute } from "./routes/userRoute.mjs";
import session from "express-session";
import MongoStore from "connect-mongo";
const app = express();

const port = 3000;
// connect db

mongoose.connect("mongodb://localhost/smartedu-db");

// template engine

app.set("view engine", "ejs");

// global variable

global.userIN = null;

// Middlewares

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "my_keyboard_cat",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({mongoUrl: 'mongodb://localhost/smartedu-db'})
  })
);

// routes
app.use("*", (req, res, next) => {
  userIN = req.session.userID;
  next();
});
app.use("/", router);
app.use("/courses", courseRoute);
app.use("/categories", categoryRoute);
app.use("/users", userRoute);

app.listen(port, () => {
  console.log(`App is up on port : ${port}`);
});
