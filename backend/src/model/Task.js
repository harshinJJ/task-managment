const mongoose = require("mongoose");
const schema = mongoose.Schema;
const taskdetails = new schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
});
var Task = mongoose.model("Task-details", taskdetails);
module.exports = Task;
