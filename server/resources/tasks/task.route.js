import express from "express";
import {
  createTask,
  deleteTask,
  getAllTasks,
  getTask,
  updateTask,
} from "./task.controller.js";
const router = express.Router();

// /api/v1/tasks
router.route("/tasks").post(createTask).get(getAllTasks);
// /api/v1/tasks/:id
router.route("/tasks/:id").get(getTask).put(updateTask).delete(deleteTask);
export default router;
