import { NextFunction, Request, Response } from "express";
import { postSchema, commentSchema, userLoginSchema, userRegisterSchema } from "./schema";


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

const validateUserLoginData = async (req: Request, res: Response, next: NextFunction) => {
    try{
        await userLoginSchema.validate(req.body);
        next();
    }catch(err){
        next(err);
    }
}

const validateUserRegisterData = async (req: Request, res: Response, next: NextFunction) => {
    try{
        await userRegisterSchema.validate(req.body);
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
    validateUserLoginData,
    validateUserRegisterData
}