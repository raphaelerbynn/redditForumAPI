import { NextFunction, Request, Response } from "express";
import { postSchema, commentSchema, userSchema, RequestCustom } from "./schema";
import { User } from "../model";
import bcrypt from "bcrypt";


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
        const auth = req.headers.authorization;
        if (!auth){
            res.status(403);
            throw Error("Not authenticated");
        }

        const encoded = auth.substring(6);
        const [email, password] = Buffer.from(encoded, "base64").toString().split(":");

        const user = await User.findByPk(email);
        if (!user){
            res.status(403);
            throw Error("Unknown user");
        };

        const matchUser = await bcrypt.compare(password, user.password);
        if(!matchUser){
            res.status(403);
            throw Error("Invalid username or password");
        };

        console.log(email);
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