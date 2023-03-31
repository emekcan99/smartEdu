import express from "express";

const app = express();

const port = 3000;

app.get("/", (req, res) => {
  res.status(200).send("Index");
});

app.listen(port, () => {
  console.log(`App is up on port : ${port}`);
});
