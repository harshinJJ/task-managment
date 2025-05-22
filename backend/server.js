require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRouter = require("./src/routes/userRouter");
const loginRouter = require("./src/routes/loginRouter");
const taskRouter = require("./src/routes/taskRouter");
const app = express();
const port = process.env.PORT;
const mongoUrl = process.env.MONGO_URL;

mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });


app.use("/registration", userRouter);
app.use("/login", loginRouter);
app.use("/task", taskRouter);
// app.get("/", (req, res) => {
//   res.send("Hello, World!");
// });

app.listen(port, () => {
  console.log(`SERVER STARTED on port ${port}`);
});
