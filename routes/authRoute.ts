import express from "express";
import authController from "../controller/authController";
import { validateUserLoginData, validateUserRegisterData } from "../utils/middlewares";

const router = express.Router({ mergeParams: true });

router.post("/register", validateUserRegisterData, authController.registerUser);
router.post("/login", validateUserLoginData, authController.loginUser);

export default router;