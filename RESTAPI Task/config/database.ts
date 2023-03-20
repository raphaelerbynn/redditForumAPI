import { Sequelize } from "sequelize";

const sequelize = new Sequelize("social_network_db", "root", "admin", {
    host: "localhost",
    dialect: "mysql"
});

export default {
    sequelize
}