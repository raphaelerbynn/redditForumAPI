import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    title: {type: String, require: true},
    content: {type: String, require: true},
    author: {type: String, require: true},
    date: {type: Date, require: true},
    comments: {type: Array, required: true}
});

const Post = mongoose.model("post", postSchema);

//connect to mongodb
mongoose.connect("mongodb+srv://raphael:mountain2402@cluster0.yqvrf18.mongodb.net/?retryWrites=true&w=majority")
    .then(() => console.log("Database connected"))
    .catch(err => console.log(err));

const app = express();
const port = 5000;

app.get("/", (req: Request, res: Response) => {
  res.send('Homepage');
});

app.get("/post", async (req: Request, res: Response) => {
    const users = await Post.find();
    res.json(users);
});

app.use((req: Request, res: Response) => {
    res.status(404).send("Not found");
});

app.listen(port, () => {
  console.log(`Server listening at port ${port}`);
});
