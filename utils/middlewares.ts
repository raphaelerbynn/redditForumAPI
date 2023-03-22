import { NextFunction, Request, Response } from "express";
import { postSchema, commentSchema, userSchema, RequestCustom } from "./schema";
import jwt from "jsonwebtoken";


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

const authenticateUser = async (req: RequestCustom, res: Response, next: NextFunction) => {
    
    try{
        const authHeader = req.headers.authorization;
        if (!authHeader){
            res.status(403);
            throw Error("Not authenticated");
        }
        
        /* using basic authentication */
        // const encoded = auth.substring(6);
        // const [email, password] = Buffer.from(encoded, "base64").toString().split(":");

        /* using jwt */
        const token = authHeader.split(" ")[1];
        if (!token){
            res.status(403);
            throw Error("Not authenticated");
        }
        const user: any = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = user;

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