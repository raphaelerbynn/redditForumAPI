import express, { NextFunction, Request, Response } from 'express';

const app = express();
const port = 3000;

app.get("/", (req: Request, res: Response) => {
  res.send('Homepage');
});

//square number
app.get("/square/:number", (req: Request, res: Response, next: NextFunction) => {
    const num = Number(req.params.number);

    //handle not a number error
    if(isNaN(num)){
        //res.status(400).send("Invalid number");
        //return
        const err = new Error("Invalid number");
        next(err);
        return
    }

    const square = num*num;
    res.send(`Square of ${num} is ${square}`);
});

app.use((req: Request, res: Response) => {
    res.status(404).send("Not found");
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    const errMsq: {} = {
        error: {
            message: err.message
        }
    }
    res.status(400).json(errMsq);
});

app.listen(port, () => {
  console.log(`Server listening at port ${port}`);
});
