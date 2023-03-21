import { Response, Request, NextFunction } from "express";
import { RequestCustom } from "../utils/schema";
import { createNewPost, deletePostById, findAllPost, findPostById, updatePostById } from "../services/postService";

const getAllPost = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const posts = await findAllPost();
        res.json(posts);
    }catch(err){
        next(err);
    }
};

const getPost = async (req: Request, res: Response, next: NextFunction) => {
    const postID = req.params.post_id;
    try{
        //throw Error("Test error")
        const post = await findPostById(postID);
        if(!post){
            res.status(404);
            throw Error("Post not found");
        }
        res.json(post);
    }catch(err){
        next(err);
    }
};

const createPost = async (req: RequestCustom, res: Response, next: NextFunction) => {
    const newPost = {
        ...req.body,
        userId: req.user.email
    };

    try{
        await createNewPost(newPost);
        res.status(201).send("Posted Successfully");
    }catch(err){
        next(err);
    }
};

const updatePost = async (req: RequestCustom, res: Response, next: NextFunction) => {
    const postID = req.params.post_id;
    const postData: {} = req.body;

    try{
        const post = await findPostById(postID);
        if(!post){
            throw Error("Post not found");
        }

        if(post.userId !== req.user.email){
            res.status(409);
            throw Error("Unauthorized");
        }

        await updatePostById(postData, postID);
        res.send("Post edited Successfully");
    }catch(err){
        next(err);
    }
};

const deletePost = async (req: RequestCustom, res: Response, next: NextFunction) => {
    const postID = req.params.post_id;
    try{
        const post = await findPostById(postID);
        if(!post){
            throw Error("Post not found");
        }

        if(post.userId !== req.user.email){
            res.status(409);
            throw Error("Unauthorized");
        }

        await deletePostById(postID);
        res.send("Post deleted Successfully");
    }catch(err){
        next(err);
    }
};

export default {
    getAllPost,
    getPost,
    createPost,
    updatePost,
    deletePost
}