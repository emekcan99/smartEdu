import { Category } from "../modals/Category.mjs";
import { Course } from "../modals/Course.mjs";
import { User } from "../modals/User.mjs";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";

export const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).redirect("/login");
  } catch (error) {
    const errors = validationResult(req);
    console.log(errors);
    console.log(errors.array()[0].msg);

    for (let i = 0; i < errors.array().length; i++) {
      req.flash("error", `${errors.array()[i].msg}`);
    }

    res.status(400).redirect("/register");
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      bcrypt.compare(password, user.password, (err, same) => {
        if (same) {
          // user session

          req.session.userID = user._id;

          res.status(200).redirect("/users/dashboard");
        } else {
          req.flash("error", "your password is not correct");

          res.status(400).redirect("/login");
        }
      });
    } else {
      req.flash("error", "user is not exist!");
      res.status(400).redirect("/login");
    }
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

export const logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};

export const getDashboardPage = async (req, res) => {
  const user = await User.findOne({ _id: req.session.userID }).populate(
    "courses"
  );

  const categories = await Category.find();

  const courses = await Course.find({ user: req.session.userID });

  const users = await User.find();

  res.status(200).render("dashboard", {
    page_name: "dashboard",
    user,
    categories,
    courses,
    users
  });
};


export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndRemove(req.params.id);

    await Course.deleteMany({user:req.params.id})

    res.status(200).redirect("/users/dashboard");
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};