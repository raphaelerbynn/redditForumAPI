import { Response, Request, NextFunction } from "express";
import { Post } from "../model/index";

const getAllPost = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const posts = await Post.findAll();
        res.json(posts);
    }catch(err){
        next(err);
    }
};

const getPost = async (req: Request, res: Response, next: NextFunction) => {
    const postID = req.params.post_id;
    try{
        //throw Error("Test error")
        const post = await Post.findByPk(postID);
        if(!post){
            res.status(404);
            throw Error("Post not found");
        }
        res.json(post);
    }catch(err){
        next(err);
    }
};

const createPost = async (req: Request, res: Response, next: NextFunction) => {
    const newPost: {} = req.body;
    try{
        await Post.create(newPost);
        res.status(201).send("Posted Successfully");
    }catch(err){
        next(err);
    }
};

const updatePost = async (req: Request, res: Response, next: NextFunction) => {
    const postID = req.params.post_id;
    const postData: {} = req.body;

    try{
        const post = await Post.findByPk(postID);
        if(!post){
            throw Error("Post not found");
        }
        const updatePost = await post.update(postData);
        res.send("Post edited Successfully");
    }catch(err){
        next(err);
    }
};

const deletePost = async (req: Request, res: Response, next: NextFunction) => {
    const postID = req.params.post_id;
    try{
        const post = await Post.findByPk(postID);
        if(!post){
            throw Error("Post not found");
        }
        await post.destroy();
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