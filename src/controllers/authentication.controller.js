const assert = require("assert");
const jwt = require("jsonwebtoken");
const pool = require("../config/database");
const validateEmail = require("../util/emailvalidator");
const logger = require("../config/config").logger;

module.exports = {
    login(req, res, next) {
        pool.getConnection((err, connection) => {
            if (err) {
                logger.error("Error getting connection from pool");
                res
                    .status(500)
                    .json({ error: err.toString(), datetime: new Date().toISOString() });
            }
            if (connection) {
                connection.query(
                    "SELECT `ID`, `First_Name`, `Last_Name`, `Email`, `Password` FROM `user` WHERE `Email` = ?",
                    [req.body.email],
                    (err, rows, fields) => {
                        connection.release();
                        if (err) {
                            logger.error("Error: ", err.toString());
                            res.status(500).json({
                                error: err.toString(),
                                datetime: new Date().toISOString(),
                            });
                        } else {
                            logger.info("Result from database: ");
                            logger.info(rows);

                            if (
                                rows &&
                                rows.length === 1 &&
                                rows[0].Password === req.body.password
                            ) {
                                logger.info("password = " + rows[0].Password);
                                logger.info("passwords DID match, sending valid token");
                                const payload = {
                                    id: rows[0].ID,
                                };
                                const userinfo = {
                                    token: jwt.sign(payload, "secret", { expiresIn: "2h" }),
                                    username: rows[0].First_Name + " " + rows[0].Last_Name,
                                };
                                res.status(200).json(userinfo);
                            } else {
                                logger.info("User not found or password is invalid");
                                res.status(400).json({
                                    error: "User not found or password is invalid",
                                    datetime: new Date().toISOString(),
                                });
                            }
                        }
                    }
                );
            }
        });
    },

    validateLogin(req, res, next) {
        try {
            assert(typeof req.body.email === "string", "email must be a string.");
            assert(
                typeof req.body.password === "string",
                "password must be a string."
            );
            next();
        } catch (ex) {
            res
                .status(400)
                .json({ error: ex.toString(), datetime: new Date().toISOString() });
        }
    },

    register(req, res, next) {
        logger.info("register");
        logger.info(req.body);

        pool.getConnection((err, connection) => {
            if (err) {
                logger.error("Error getting connection from pool: " + err.toString());
                res
                    .status(500)
                    .json({ error: ex.toString(), datetime: new Date().toISOString() });
            }
            if (connection) {
                let { firstname, lastname, email, password } = req.body;

                connection.query(
                    "INSERT INTO `user` (`First_Name`, `Last_Name`, `Email`, `Password`, `RoleID`) VALUES (?, ?, ?, ?, ?)",
                    [firstname, lastname, email, password, 2],
                    (err, rows, fields) => {
                        connection.release();
                        if (err) {
                            logger.error("Error: " + err.toString());
                            res.status(400).json({
                                error: "This username has already been taken.",
                                datetime: new Date().toISOString(),
                            });
                        } else if (validateEmail(email) === false) {
                            res.status(400).json({
                                error: "This email is wrong.",
                                datetime: new Date().toISOString(),
                            });
                        } else {
                            logger.trace(rows);
                            const payload = {
                                id: rows.insertId,
                            };
                            const userinfo = {
                                token: jwt.sign(payload, "secret", { expiresIn: "2h" }),
                                username: firstname + " " + lastname,
                            };
                            res.status(200).json(userinfo);
                        }
                    }
                );
            }
        });
    },

    validateRegister(req, res, next) {
        try {
            assert(
                typeof req.body.firstname === "string",
                "firstname must be a string."
            );
            assert(
                typeof req.body.lastname === "string",
                "lastname must be a string."
            );
            assert(typeof req.body.email === "string", "email must be a string.");
            assert(
                typeof req.body.password === "string",
                "password must be a string."
            );
            next();
        } catch (ex) {
            res
                .status(400)
                .json({ error: ex.toString(), datetime: new Date().toISOString() });
        }
    },

    validateToken(req, res, next) {
        logger.info("validateToken called");
        logger.trace(req.headers);
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            logger.warn("Authorization header missing!");
            res.status(401).json({
                error: "Authorization header missing!",
                datetime: new Date().toISOString(),
            });
        }
        const token = authHeader.substring(7, authHeader.length);

        jwt.verify(token, "secret", (err, payload) => {
            if (err) {
                logger.warn("Not authorized");
                res.status(401).json({
                    error: "Not authorized",
                    datetime: new Date().toISOString(),
                });
            }
            if (payload) {
                logger.debug("token is valid", payload);
                req.userId = payload.id;
                next();
            }
        });
    },
};
