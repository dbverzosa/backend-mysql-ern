import { Sequelize } from "sequelize";

const db = new Sequelize('hproject', 'root', '',{
    host: 'localhost',
    dialect: 'mysql'
});

export default db
