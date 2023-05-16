import express from "express";
import authRouter from "../../resources/users/auth/auth.route.js";

const router = express.Router();

router.use(`/auth`, authRouter);
// router.use(`/users`, userRouter);
// router.use(`/tasks`, authRouter);
// router.use(`/subtasks`, authRouter);
// router.use(`/tags`, authRouter);

export default router;
