const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

mongoose
  .connect("mongodb://localhost:27017/TodoApp", { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to mongodb");
  });

const todo = require("./routes/todo");

const app = express();
app.use(express.json());
app.use(cors);
app.use("/api/todos", todo);

app.get("/", (req, res) => {
  res.send("Todo App API");
});

app.listen(8000, () => {
  console.log("Server started");
});
