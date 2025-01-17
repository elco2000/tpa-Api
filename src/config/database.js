const mysql = require("mysql");
const config = require("./config");
const logger = config.logger;
const dbconfig = require("./config").dbconfig;

// const pool = mysql.createPool(dbconfig);

const { Pool, Client } = require('pg')
const connectionString = process.env.DB_DATABASE || 'postgres://postgres:root@localhost:5432/tpa'
// const connectionString = 'postgres://fyorxhufrtbcmm:52625bdb38facd786144dff7b9a032994f0b3d1f33951035ee7ed5b3a61df480@ec2-54-217-204-34.eu-west-1.compute.amazonaws.com:5432/d11i3kcar6j2rk'
const pool = new Pool({
    connectionString: connectionString,
})
const client = new Client({
    connectionString: connectionString,
})

module.exports = pool;