import express from "express";
import apiRoutes from "./apiRoutes.js";
import env from "../../config/envValidation.js";

const router = express.Router();

router.use(`${env.API_URL}`, apiRoutes);

export default router;
