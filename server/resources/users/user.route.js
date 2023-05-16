import express from "express";
import {createUser} from "./user.controller.js";

const router = express.Router();

// /api/v1/tasks
router.route("/users").post(createUser);
// /api/v1/tasks/:id
// router.route("/users/:id").get(getTask).put(updateTask).delete(deleteTask);
export default router;
