import { Response, Request, NextFunction } from "express";
import { Post, Comment } from "../model/index";
import { RequestCustom } from "../utils/schema";

const getAllCommnetForPost = async (req: Request, res: Response, next: NextFunction) => {
    const postID = req.params.post_id;
    try{
        const post = await Post.findByPk(postID);
        if(!post){
            res.status(404);
            throw Error("Post not found");
        }
        try{
            const comments = await Comment.findAll({
                where: {
                    postId: postID
                }
            });
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
        const post = await Post.findByPk(postID);
        if(!post){
            res.status(404);
            throw Error("Post not found");
        }
        try{
            const comment = await Comment.findByPk(commentID);
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

const createComment = async (req: Request, res: Response, next: NextFunction) => {
    const postID = req.params.post_id;
    const commentData: {} = {
        ...req.body,
        postId: postID
    };
    try{
        const post = await Post.findByPk(postID);
        if(!post){
            res.status(404);
            throw Error("Post not found");
        }
        try{
            await Comment.create(commentData);
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
        const post = await Post.findByPk(postID);
        if(!post){
            res.status(404);
            throw Error("Post not found");
        }
        try{
            const comment = await Comment.findByPk(commentID);
            if(!comment){
                throw Error("Comment not found");
            }

            if(comment.userId !== req.user.email){
                res.status(409);
                throw Error("Unauthorized");
            }

            await comment.update(commentData);
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
        const post = await Post.findByPk(postID);
        if(!post){
            res.status(404);
            throw Error("Post not found");
        }
        try{
            const comment = await Comment.findByPk(commentID);
            if(!comment){
                res.status(404);
                throw Error("Comment not found");
            }

            if(comment.userId !== req.user.email){
                res.status(409);
                throw Error("Unauthorized");
            }

            await comment.destroy()
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