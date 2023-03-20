import express from "express";
import dotenv from "dotenv"
import db from "./config/database";
import postRoute from "./routes/postRoutes";
import errorHandler from "./utils/errorhandling";
import { undefinedEndpoint } from "./utils/middlewares";
import Comment from "./model/CommentModel";
import Post from "./model/PostModel";
import authRoute from "./routes/authRoute";

dotenv.config()

Post.hasMany(Comment);
Comment.belongsTo(Post);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/", authRoute);
app.use("/post", postRoute);

app.use(undefinedEndpoint)
app.use(errorHandler);

db.sequelize.sync({ alter: true })
.then(() => {
    app.listen(port, () => console.log(`Server running on port ${port}`));
})
.catch(err => {
    console.log("Database not connected: "+ err);
})

