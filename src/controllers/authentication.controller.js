const assert = require("assert");
const jwt = require("jsonwebtoken");
const pool = require("../config/database");
const validateEmail = require("../util/emailvalidator");
const logger = require("../config/config").logger;
const HTMLDecoderEncoder = require("html-encoder-decoder");

module.exports = {
    login(req, res, next) {
        pool.query(
            'SELECT "ID", "First_Name", "Last_Name", "Email", "Password" FROM "user" WHERE "Email" = $1',
            [req.body.email],
            (err, result, fields) => {
                // connection.release();
                if (err) {
                    logger.error("Error: ", err);
                    res.status(500).json({
                        error: err.toString(),
                        datetime: new Date().toISOString(),
                    });
                } else {
                    logger.info("Result from database: ");
                    logger.info(result);

                    if (result.rows.length >= 1 && result.rows[0].Password === req.body.password) {
                        logger.info("password = " + result.rows[0].Password);
                        logger.info("passwords DID match, sending valid token");
                        const payload = {
                            id: result.rows[0].ID,
                        };
                        const userinfo = {
                            token: jwt.sign(payload, "secret", {expiresIn: "2h"}),
                            username: result.rows[0].First_Name + " " + result.rows[0].Last_Name,
                        };
                        res.status(200).json(userinfo);
                    } else {
                        logger.info("User not found or password is invalid");
                        res.status(401).json({
                            error: "User not found or password is invalid",
                            datetime: new Date().toISOString(),
                        });
                    }
                }
            }
        );
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
                .json({error: ex.toString(), datetime: new Date().toISOString()});
        }
    },

    register(req, res, next) {
        logger.info("register");
        logger.info(req.body);

        let {firstname, lastname, email, password} = req.body;


        pool.query(
            'INSERT INTO "user" ("First_Name", "Last_Name", "Email", "Password", "RoleID") VALUES($1, $2, $3, $4, $5)',
            [firstname, lastname, email.toLowerCase(), password, 2],
            (err, rows, fields) => {
                if (err) {
                    logger.error("Error: " + err);
                    res.status(400).json({
                        error: "This username has already been taken.",
                        datetime: new Date().toISOString(),
                    });
                } else {
                    logger.trace(rows);
                    const payload = {
                        id: rows.insertId,
                    };
                    const userinfo = {
                        token: jwt.sign(payload, "secret", {expiresIn: "2h"}),
                        username: firstname + " " + lastname,
                    };
                    res.status(200).json(userinfo);
                }
            }
        );
    },

    validateRegister(req, res, next) {
        if (validateEmail(req.body.email) === false) {
            res.status(400).json({
                error: "This email is wrong.",
                datetime: new Date().toISOString(),
            });
        } else {
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
                    .json({error: ex.toString(), datetime: new Date().toISOString()});
            }
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

    getUserById(req, res, next) {
        logger.trace("Get aangeroepen op /user/:userId");
        const userId = parseInt(req.params.userId);

    pool.query(
      'SELECT "First_Name", "Last_Name", "Email" FROM "user" WHERE "ID" = $1',
      [userId],
      (error, results, fields) => {
        if (error) {
          res.status(400).json({
            message: "GetById Failed!",
            error: error,
          });
        } else if (results.rowCount === 0 && !error) {
          res.status(404).json({
            message: "User bestaat niet of er zijn geen Users beschikbaar",
          });
        } else {
          logger.trace("results: ", results);
          res.status(200).json({
            First_Name: results.rows[0].First_Name,
            Last_Name: results.rows[0].Last_Name,
            Email: results.rows[0].Email,
          });
        }
      }
    );
  },
};
