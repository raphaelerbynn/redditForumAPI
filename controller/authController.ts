import { Response, Request, NextFunction } from "express";
import { User } from "../model/index";
import bcrpyt from "bcrypt";
import { RequestCustom } from "../utils/schema";

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
    res.send("Logged in");
};

export default {
    registerUser,
    loginUser
}