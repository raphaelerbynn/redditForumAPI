import { DataTypes } from "sequelize";
import db from "../config/database";
import { CommentModel } from "./interface";

const Comment = db.sequelize.define<CommentModel>(`comments`, {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    title: DataTypes.STRING,
    content: DataTypes.TEXT
},{
    tableName: "comments"
});

export default Comment;
