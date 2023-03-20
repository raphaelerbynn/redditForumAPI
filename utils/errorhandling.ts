import { NextFunction, Request, Response } from "express";

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    const errMsg = {
        error: {
            message: err.message
        }
    };

    console.error(err);
    res.json(errMsg);
}

export default errorHandler;