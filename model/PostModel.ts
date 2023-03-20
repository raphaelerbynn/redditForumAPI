import { DataTypes } from "sequelize";
import db from "../config/database";

const Post = db.sequelize.define(`posts`, {
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
