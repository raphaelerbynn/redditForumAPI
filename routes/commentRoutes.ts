import express from "express";
import commentController from "../controller/commentController";
import { authenticateUser, validateCommentData } from "../utils/middlewares";

const router = express.Router({mergeParams: true});

router.get("/", commentController.getAllCommnetForPost);
router.get("/:comment_id", commentController.getSingleComment);

router.post("/", authenticateUser, validateCommentData, commentController.createComment);

router.put("/:comment_id", authenticateUser, commentController.updateComment);
router.delete("/:comment_id", authenticateUser, commentController.deleteComment);

export default router;