import express from "express";
import {login, register, logout, googleLogin} from "./auth.controller.js";
import {isAuth} from "../../../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(isAuth, logout);

// router.route("/google-login").post(googleLogin);

export default router;
