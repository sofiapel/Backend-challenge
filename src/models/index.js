require('dotenv').config();
// import { DataSource } from "typeorm";
var typeorm = require("typeorm");
const user = require('./user');

const {
    DB_PORT,DB_HOST,DB_USERNAME,DB_PASSWORD,DATABASE
  } = process.env;

const AppDataSource = new typeorm.DataSource({
    type: "mysql",
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DATABASE,
    synchronize: true,
    // logging: true,
    entities: [user],
    subscribers: [],
    migrations: [],
})

module.exports = AppDataSource;