import express from "express";
import commentController from "../controller/commentController";
import { validateCommentData } from "../utils/middlewares";

const router = express.Router({mergeParams: true});

router.get("/", commentController.getAllCommnetForPost);
router.get("/:comment_id", commentController.getSingleComment);

router.post("/", validateCommentData, commentController.createComment);

router.put("/:comment_id", commentController.updateComment);
router.delete("/:comment_id", commentController.deleteComment);

export default router;