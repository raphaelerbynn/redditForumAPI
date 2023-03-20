import { DataTypes } from "sequelize";
import db from "../config/database";


const Comment = db.sequelize.define(`comments`, {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    user_id: DataTypes.STRING
},{
    tableName: "comments"
});

export default Comment;
