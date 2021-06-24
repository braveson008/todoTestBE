const express = require("express");

const app = express();

const authRoutes = require("./routes/authRoutes");
const todoRoutes = require("./routes/todoRoutes");

const url =
  "mongodb+srv://admin:admin@cluster0.9kpn9.mongodb.net/todoBase?retryWrites=true&w=majority";

const mongoose = require("mongoose", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

mongoose.connect(url, {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection
  .once("open", function () {
    console.log("Connected");
  })
  .on("error", function (error) {
    console.log(error);
  });

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/todo", todoRoutes);

app.listen(9000, () => console.log("connected"));
