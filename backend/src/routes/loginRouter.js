const express = require("express");
const Registration = require("../model/Registration");
const loginRouter = express.Router();
const jwt = require("jsonwebtoken");
const Bcrypt = require("bcryptjs");

//login part
loginRouter.post("/", async (req, res) => {
  try {
    const specificemail = await Registration.findOne({
      email: req.body.email,
    });
    if (!specificemail) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "user not exists",
      });
    }
    const specificpass = specificemail.password;
    const newpass = req.body.password;
    const token = jwt.sign(
      {
        email: specificemail.email,
      },
      "secret_key_3020",
      { expiresIn: "5h" }
    );
    console.log(token);
    console.log(specificemail);
    const crosspass = await Bcrypt.compare(newpass, specificpass);
    if (!crosspass) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "incorrect password",
      });
    } else {
      return res.status(200).json({
        success: true,
        error: false,
        message: "Login success",
        logindata: specificemail,
        token: token,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: true,
      error: false,
      message: "internal server error",
      error: error,
      errormessage: error.message,
    });
  }
});
module.exports = loginRouter;
