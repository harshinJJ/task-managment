const mongoose = require("mongoose");
const schema = mongoose.Schema;
const registerdetails = new schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});
var Registration = mongoose.model("Registration-details", registerdetails);
module.exports = Registration;
