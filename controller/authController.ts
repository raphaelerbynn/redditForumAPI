import { Response, Request, NextFunction } from "express";
import { User } from "../model/index";
import bcrpyt from "bcrypt";

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

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    const userDetails = req.body;
    try{
        const user = await User.findByPk(userDetails.email);
        if(!user){
            res.status(404);
            throw Error("User not found");
        }

        let authenticate = false;
        authenticate = await bcrpyt.compare(userDetails.password, user.password);
        if(authenticate){
            res.status(202).send(user);
        }else{
            res.status(401);
            throw Error("Invalid username or password");
        }
    }catch(err){
        next(err);
    }
};


export default {
    registerUser,
    loginUser
}