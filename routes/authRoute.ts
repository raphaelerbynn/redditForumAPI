import express from "express";
import authController from "../controller/authController";
import { authenticateUser, validateUserData } from "../utils/middlewares";

const router = express.Router({ mergeParams: true });

router.post("/register", validateUserData, authController.registerUser);
router.post("/login", validateUserData, authController.loginUser);

export default router;