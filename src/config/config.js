const loglevel = process.env.LOGLEVEL || "trace";

module.exports = {
    dbconfig: {
        host: process.env.DB_HOST || "localhost",
        user: process.env.DB_USER || "root",
        database: process.env.DB_DATABASE || "tpa",
        password: process.env.DB_PASSWORD || "root",
        connectionLimit: 10,
    },

    logger: require("tracer").console({
        level: loglevel,
    }),
};