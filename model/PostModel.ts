import { DataTypes, Model } from "sequelize";
import db from "../config/database";
import { PostModel } from "./interface";

const Post = db.sequelize.define<PostModel>(`posts`, {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    title: DataTypes.STRING,
    content: DataTypes.TEXT
},{
    tableName: "posts"
});

export default Post;
