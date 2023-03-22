import { Response, Request, NextFunction } from "express";
import { User } from "../model/index";
import bcrpyt from "bcrypt";
import { RequestCustom } from "../utils/schema";
import { findUserByEmail } from "../services/userService";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    const userDetails = req.body;
    try{
        const user = await User.findByPk(userDetails.email);
        if(user){
            res.status(409);
            throw Error("Username already exist");
        }
        //hash password
        const hashPwd = await bcrpyt.hash(userDetails.password, 10);
        await User.create({
            ...userDetails,
            password: hashPwd
        });
        res.status(201).send("User created successfully");
    }catch(err){
        next(err);
    }
};

const loginUser = async (req: RequestCustom, res: Response, next: NextFunction) => {
    const userDetails = req.body;

    try{
        const user = await findUserByEmail(userDetails.email);
        if (!user){
            res.status(403);
            throw Error("Unknown user");
        };

        const matchUser = await bcrpyt.compare(userDetails.password, user.password);
        if(!matchUser){
            res.status(403);
            throw Error("Invalid username or password");
        };
        
        const token = await jwt.sign(userDetails, process.env.JWT_SECRET_KEY);
        res.json({
            token: token
        })

    }catch(err){
        next(err);
    }
};

export default {
    registerUser,
    loginUser
}