const express = require("express");
const Registration = require("../model/Registration");
const userRouter = express.Router();
const Bcrypt = require("bcryptjs");

//registering new user
userRouter.post("/", async (req, res) => {
  try {
    const oldEmail = await Registration.findOne({
      email: req.body.email,
    });
    if (oldEmail) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Email already exists",
      });
    }
    if (req.body.password !== req.body.confirmpassword) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "wrong confirm password",
      });
    }
    const hashedpwd = await Bcrypt.hash(req.body.password, 12);
    const regData = {
      email: req.body.email,
      password: hashedpwd,
    };
    const regResult = await Registration(regData).save();
    if (regResult) {
      return res.status(200).json({
        success: true,
        error: false,
        message: "Registration Successful",
        registrationdetails: regData,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: true,
      message: "internal server error",
      error: error,
      errormessage: error.message,
    });
  }
});
module.exports = userRouter;
