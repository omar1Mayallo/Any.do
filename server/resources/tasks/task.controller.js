import asyncHanler from "express-async-handler";
import Task from "./task.model.js";
import ApiError from "../../utils/apiError.js";

// ----------------------------
// @desc    Create A Task
// @route   POST  /api/v1/task
// @access  Private
// ----------------------------
export const createTask = asyncHanler(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      task,
    },
  });
});

// ----------------------------
// @desc    Get All Tasks
// @route   GET  /api/v1/tasks
// @access  Public
// ----------------------------
export const getAllTasks = asyncHanler(async (req, res) => {
  const task = await Task.find().populate({path: "user"});
  res.status(200).json({results: task.length, status: "success", data: tasks});
});
// ----------------------------
// @desc    Get A Task
// @route   GET  /api/v1/tasks:id
// @access  Private
// ----------------------------
export const getTask = asyncHanler(async (req, res) => {
  const {id} = req.params;
  const task = await Task.findById(id);
  if (!task) {
    return next(new ApiError(`No task for this id ${id}`, 404));
  }
  res.status(200).json({status: "success", data: task});
});
// ----------------------------
// @desc    Update A Task
// @route   PUT  /api/v1/tasks:id
// @access  Private
// ----------------------------
export const updateTask = asyncHanler(async (req, res) => {
  const {id} = req.params;
  const updatedTask = await Task.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  //task not found
  if (!updatedTask) {
    return next(new ApiError(`There is no task match this id : ${id}`, 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      updatedTask,
    },
  });
});
// ----------------------------
// @desc    Delete A Task
// @route   DELETE  /api/v1/tasks:id
// @access  Private
// ----------------------------
export const deleteTask = asyncHanler(async (req, res) => {
  const {id} = req.params;
  const deleteTask = await Task.findByIdAndDelete(id, req.body);
  //NOTFOUND Document Error
  if (!deleteTask) {
    return next(new ApiError(`There is no task match this id : ${id}`, 404));
  }
  res.status(204).json({
    status: "success",
  });
});
