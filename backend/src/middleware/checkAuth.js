const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    // const token = req.headers.authorization;
    console.log(token);
    const decodedtoken = jwt.verify(token, "secret_key_3020");
    req.userData = {
      email: decodedtoken.email,
    };
    console.log(req.userData);
    next();
  } catch (error) {
    res.status(401).json({
      succes: false,
      error: true,
      message: "authentication failed",
    });
  }
};
