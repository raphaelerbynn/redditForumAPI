import { DataTypes, Model } from "sequelize";
import db from "../config/database";
import { UserModel } from "./interface";

const User = db.sequelize.define<UserModel>("users", {
    email: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    password: DataTypes.STRING
}, {
    tableName: "users"
});

export default User;