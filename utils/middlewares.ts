import { NextFunction, Request, Response } from "express";
import { postSchema, commentSchema, userSchema } from "./schema";


const validatePostData = async (req: Request, res: Response, next: NextFunction) => {
    try{
        await postSchema.validate(req.body);
        next();
    }catch(err){
        next(err);
    }
}

const validateCommentData = async (req: Request, res: Response, next: NextFunction) => {
    try{
        await commentSchema.validate(req.body);
        next();
    }catch(err){
        next(err);
    }
}

const validateUserData = async (req: Request, res: Response, next: NextFunction) => {
    try{
        await userSchema.validate(req.body);
        next();
    }catch(err){
        next(err);
    }
}

const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
    try{
        
        next();
    }catch(err){
        next(err);
    }
}





const undefinedEndpoint = (req: Request, res: Response, next: NextFunction) => {
    const err = new Error("Page requesting not found");
    res.status(404);
    next(err)
}

export  {
    undefinedEndpoint, 
    validatePostData,
    validateCommentData,
    validateUserData,
    authenticateUser
}