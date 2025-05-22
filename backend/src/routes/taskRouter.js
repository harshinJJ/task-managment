const express = require("express");
const Task = require("../model/Task");
const { deserialize } = require("mongodb");
const taskRouter = express.Router();

//to fetch all task
taskRouter.get("/getalltask", async (req, res) => {
  try {
    const task = await Task.find();
    return res.status(200).json({
      success: true,
      error: false,
      message: "Finding task Successful",
      tasks: task,
    });
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

//to save a new task
taskRouter.post("/newtask", async (req, res) => {
  try {
    const newtask = new Task({
      title: req.body.title,
      description: req.body.description,
    });
    const savetask = await Task(newtask).save();
    return res.status(200).json({
      success: true,
      error: false,
      message: "Registration Successful",
      savedtask: savetask,
    });
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

//to update task
taskRouter.put("/updatetask/:id", async (req, res) => {
  try {
    const taskid = req.params.id;
    const updatetask = {
      title: req.body.title,
      description: req.body.description,
    };
    const updatingtask = await Task.updateOne(
      { _id: taskid },
      { $set: updatetask }
    );
    return res.status(200).json({
      success: true,
      error: false,
      message: "updated successfully",
      update: updatingtask,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: true,
      message: "internal server error",
      error: error,
      errormessage: error.message,
    });
  }
});

//to delete task
taskRouter.delete("/deletetask/:id", async (req, res) => {
  try {
    const taskid = req.params.id;
    const deletetask = Task.deleteOne({ _id: taskid });
    return res.status(200).json({
      success: true,
      error: false,
      message: "deleted successfully",
      deletedtask: deletetask,
    });
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
module.exports = taskRouter;
