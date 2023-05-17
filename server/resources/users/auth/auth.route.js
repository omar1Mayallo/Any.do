import express from "express";
import {login, register, logout} from "./auth.controller.js";
import {isAuth} from "../../../middlewares/authMiddleware.js";
import {loginValidator, registerValidator} from "./auth.validators.js";

const router = express.Router();

router.route("/register").post(registerValidator, register);
router.route("/login").post(loginValidator, login);
router.route("/logout").post(isAuth, logout);

// router.route("/google-login").post(googleLogin);

export default router;
