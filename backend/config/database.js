import { Sequelize } from "sequelize";

const db = new Sequelize("db_crud_react_express", "root", "", {
    host: "localhost",
    dialect: "mysql",
    host: "127.0.0.1"
});

export default db;