import { Response, Request, NextFunction } from "express";
import { User } from "../model/index";

const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    const userDetails = req.body;
    try{
        const user = await User.findByPk(userDetails.username);
        if(user){
            res.status(409);
            throw Error("Username already exist");
        }
        await User.create(userDetails);
        res.status(201).send("User created successfully");
    }catch(err){
        next(err);
    }
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    const userDetails = req.body;
    try{
        const user = await User.findByPk(userDetails.username);
        if(!user){
            res.status(404);
            throw Error("User not found");
        }

        res.status(202).send(user);
    }catch(err){
        next(err);
    }
};


export default {
    registerUser,
    loginUser
}