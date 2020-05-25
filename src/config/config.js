const loglevel = process.env.LOGLEVEL || "trace";

module.exports = {
    dbconfig: {
        host: process.env.DB_HOST || "",
        user: process.env.DB_USER || "",
        database: process.env.DB_DATABASE || "",
        password: process.env.DB_PASSWORD || "",
        connectionLimit: 10,
    },

    logger: require("tracer").console({
        level: loglevel,
    }),
};