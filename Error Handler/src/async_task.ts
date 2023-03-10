import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import * as yup from "yup";

const postSchemaValidation = yup.object().shape({
  title: yup.string().required(),
  content: yup.string().required("Content needed"),
  author: yup.string().notRequired()
});

const postSchema = new mongoose.Schema({
  title: { type: String, require: true },
  content: { type: String, require: true },
  author: { type: String, require: true }
});

const Post = mongoose.model("post", postSchema);

//connect to mongodb
mongoose
  .connect(
    "mongodb+srv://raphael:mountain2402@cluster0.yqvrf18.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("Database connected"))
  .catch((err) => {
    console.log(err);
  });

const app = express();
const port = 5000;

//middleware func
const validatePost = (req: Request, res: Response, next: NextFunction) => {
  postSchemaValidation.validate(req.body)
  .then(() => next())
  .catch((err) => next(err));
};

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Homepage");
});

app
  .route("/post")
  .get(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await Post.find();
      res.json(users);
    } catch (err) {
      err = new Error("Failed to fetch users");
      next(err);
    }
  })
  .post(validatePost, async (req: Request, res: Response, next: NextFunction) => {
      const post = req.body;
      Post.insertMany(post)
      .then(() => {
        res.send("Inserted successfully");
      })
      .catch((err) => {
        err = new Error("Failed to insert post");
        next(err);
      });
      // const { title, content, author } = req.body;
      // const insertPost = new Post({
      //   title: title,
      //   content: content,
      //   author: author
      // });
      //  insertPost.save();
  });

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).send("Not found");
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  const errMsg: {} = {
    error: {
      message: err.message
    },
  };
  console.log(err);
  res.status(500).json(errMsg);
});

app.listen(port, () => {
  console.log(`Server listening at port ${port}`);
});
