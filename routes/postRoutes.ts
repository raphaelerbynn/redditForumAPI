import express from "express";
import postController from "../controller/postController"
import { authenticateUser, validatePostData } from "../utils/middlewares";
import commentRoute from "./commentRoutes";

const router = express.Router();

router.use("/:post_id/comment", commentRoute);

router.get("/", postController.getAllPost);
router.get("/:post_id", postController.getPost);

router.post("/", authenticateUser, validatePostData, postController.createPost);

router.put("/:post_id", authenticateUser, postController.updatePost);
router.delete("/:post_id", authenticateUser, postController.deletePost);

export default router;