import { Response, Request, NextFunction } from "express";
import { RequestCustom } from "../utils/schema";
import { createNewComment, deleteCommentById, findAllComment, findCommentById, updateCommentById } from "../services/commentService";
import { findPostById } from "../services/postService";

const getAllCommnetForPost = async (req: Request, res: Response, next: NextFunction) => {
    const postID = req.params.post_id;
    try{
        const post = await findPostById(postID);
        if(!post){
            res.status(404);
            throw Error("Post not found");
        }
        try{
            const comments = await findAllComment(postID);
            res.send(comments);
        }catch(err){
            next(err);
        }
        res.send(post);
    }catch(err){
        next(err);
    }
};

const getSingleComment = async (req: Request, res: Response, next: NextFunction) => {
    const postID = req.params.post_id;
    const commentID = req.params.comment_id;
    try{
        //throw Error("Test error")
        const post = await findPostById(postID);
        if(!post){
            res.status(404);
            throw Error("Post not found");
        }
        try{
            const comment = await findCommentById(commentID);
            if(!comment){
                res.status(404);
                throw Error("Comment not found");
            }
            res.send(comment);
        }catch(err){
            next(err);
        }
    }catch(err){
        next(err);
    }
};

const createComment = async (req: RequestCustom, res: Response, next: NextFunction) => {
    const postID = req.params.post_id;
    const commentData: {} = {
        ...req.body,
        postId: postID,
        userId: req.user.email
    };
    try{
        const post = await findPostById(postID);
        if(!post){
            res.status(404);
            throw Error("Post not found");
        }
        try{
            await createNewComment(commentData);
            console.log(commentData);
            res.status(201).send("Commented Successfully");
        }catch(err){
            next(err);
        }
    }catch(err){
        next(err);
    }
};

const updateComment = async (req: RequestCustom, res: Response, next: NextFunction) => {
    const postID = req.params.post_id;
    const commentID = req.params.comment_id;
    const commentData = req.body;

    try{
        //throw Error("Test error")
        const post = await findPostById(postID);
        if(!post){
            res.status(404);
            throw Error("Post not found");
        }
        try{
            const comment = await findCommentById(commentID);
            if(!comment){
                throw Error("Comment not found");
            }

            if(comment.userId !== req.user.email){
                res.status(409);
                throw Error("Unauthorized");
            }

            await updateCommentById(commentData, commentID);
            res.send("Comment updates successfully");
        }catch(err){
            next(err);
        }
    }catch(err){
        next(err);
    }
};

const deleteComment = async (req: RequestCustom, res: Response, next: NextFunction) => {
    const postID = req.params.post_id;
    const commentID = req.params.comment_id;
    try{
        //throw Error("Test error")
        const post = await findPostById(postID);
        if(!post){
            res.status(404);
            throw Error("Post not found");
        }
        try{
            const comment = await findCommentById(commentID);
            if(!comment){
                res.status(404);
                throw Error("Comment not found");
            }

            if(comment.userId !== req.user.email){
                res.status(409);
                throw Error("Unauthorized");
            }

            await deleteCommentById(commentID);
            res.send("Comment deleted successfully");
        }catch(err){
            next(err);
        }
    }catch(err){
        next(err);
    }
};

export default {
    getAllCommnetForPost,
    createComment,
    getSingleComment,
    updateComment,
    deleteComment
}