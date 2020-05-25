const mysql = require("mysql");
const config = require("./config");
const logger = config.logger;
const dbconfig = require("./config").dbconfig;

const pool = mysql.createPool(dbconfig);

module.exports = pool;