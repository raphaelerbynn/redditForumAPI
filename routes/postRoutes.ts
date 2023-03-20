import express from "express";
import postController from "../controller/postController"
import { validatePostData } from "../utils/middlewares";
import commentRoute from "./commentRoutes";

const router = express.Router();

router.use("/:post_id/comment", commentRoute);

router.get("/", postController.getAllPost);
router.get("/:post_id", postController.getPost);

router.post("/", validatePostData, postController.createPost);

router.put("/:post_id", postController.updatePost);
router.delete("/:post_id", postController.deletePost);

export default router;