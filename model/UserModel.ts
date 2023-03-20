import { DataTypes, Model } from "sequelize";
import db from "../config/database";

interface UserModel extends Model{
    email: string,
    password: string
}

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