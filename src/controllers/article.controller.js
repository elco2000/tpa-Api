const assert = require("assert");
const jwt = require("jsonwebtoken");
const pool = require("../config/database");
const logger = require("../config/config").logger;

module.exports = {
  createArticle(req, res, next) {
    logger.trace("Post aangeroepen op /article/create");

    let { name, categoryid, date, body, userid, description } = req.body;

    pool.query(
      'INSERT INTO "article" ("Name", "CategoryID", "Date", "Body", "UserID", "Description") VALUES($1, $2, $3, $4, $5, $6)'[
        (name, categoryid, date, body, userid, description)
      ],
      (err, rows, fields) => {
        if (err) {
          logger.error("Error: " + err);
          res.status(400).json({
            error: "Error when creating an article",
            datetime: new Date().toISOString(),
          });
        } else {
            logger.trace("results: ", results);
            res.status(200).json({
                Name: results.rows[0].Name,
                CategoryID: results.rows[0].CategoryID,
                Date: results.rows[0].Date,
                Body: results.rows[0].Body,
                UserID: results.rows[0].UserID,
                Description: results.rows[0].Description
            })

        }
      }
    );
  },
};
