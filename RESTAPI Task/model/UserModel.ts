import { DataTypes } from "sequelize";
import db from "../config/database";

const User = db.sequelize.define("users", {
    username: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: DataTypes.STRING
}, {
    tableName: "users"
});

export default User;