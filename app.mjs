import express from "express";

const app = express();

const port = 3000;

// template engine

app.set("view engine", "ejs");

// Middlewares

app.use(express.static("public"));

// routes
app.get("/", (req, res) => {
  res.status(200).render("index", {
    page_name: "index",
  });
});

app.get("/about", (req, res) => {
  res.status(200).render("about", {
    page_name: "about",
  });
});

app.listen(port, () => {
  console.log(`App is up on port : ${port}`);
});
