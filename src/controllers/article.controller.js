const assert = require("assert");
const jwt = require("jsonwebtoken");
const pool = require("../config/database");
const logger = require("../config/config").logger;

module.exports = {
  validateArticle(req, res, next) {
    try {
      const { name, description, date, categoryid, body, typeid } = req.body;
      assert(typeof name === "string", "Name is niet juist!");
      assert(typeof description === "string", "Description is niet juist!");
      assert(typeof date === "string", "Date is onjuist ingevuld!");
      assert(typeof categoryid === "number", "Categoryid is niet juist!");
      assert(typeof body === "string", "De body is onjuist ingevuld!");
      assert(typeof typeid === "number", "Typeid is niet juist!");
      next();
    } catch (err) {
      res.status(400).json({
        message: "Error!",
        error: err.toString(),
      });
    }
  },

  createArticle(req, res, next) {
    logger.trace("Post aangeroepen op /article/create");

    let {
      name,
      description,
      date,
      categoryid,
      body,
      userid,
      typeid,
    } = req.body;

    pool.query(
      'INSERT INTO "article" ("Name", "Description", "Date", "CategoryID", "Body", "UserID", "TypeID") VALUES($1, $2, $3, $4, $5, $6, $7)',
      [name, description, date, categoryid, body, userid, typeid],
      (err, results, fields) => {
        if (err) {
          logger.error("Error: " + err);
          res.status(400).json({
            error: "Error when creating an article",
            datetime: new Date().toISOString(),
          });
        } else {
          logger.trace("results: ", results);
          res.status(200).json({
            Name: req.body.name,
            Description: req.body.description,
            Date: req.body.date,
            CategoryID: req.body.categoryid,
            Body: req.body.body,
            UserID: req.body.userid,
            TypeID: req.body.typeid,
          });
        }
      }
    );
  },

  deleteArticle(req, res, next) {
    logger.trace("Delete aangeroepen op /article/:articleId/delete");
    const articleId = parseInt(req.params.articleId);

    pool.query(
      'DELETE FROM "article" WHERE "ID" = $1',
      [articleId],
      (err, results, fields) => {
        if (results.rowCount === 0 && !err) {
          res.status(404).json({
            message: "Item not exists",
          });
        }

        if (err) {
          res.status(400).json({
            message: "Delete Failed!",
            error: err,
          });
        }
        if (results && results.rowCount > 0) {
          logger.trace("results: ", results);
          res.status(200).json({
            result: "Delete finished!",
          });
        }
      }
    );
  },

  updateArticle(req, res, next) {
    logger.trace("Put aangeroepen op /article/:articleId");
    let { name, description, date, categoryid, body, typeid } = req.body;
    const articleId = parseInt(req.params.articleId);

    pool.query(
      'UPDATE "article" SET "Name" = $1, "Description" = $2, "Date" = $3, "CategoryID" = $4, "Body" = $5, "TypeID" = $6 WHERE "ID" = $7',
      [name, description, date, categoryid, body, typeid, articleId],
      (err, results, next) => {
        if (results.rowCount === 0 && !err) {
          res.status(400).json({
            message: "Item not exists",
          });
        }

        if (err) {
          res.status(400).json({
            message: "Update Failed!",
            error: err,
          });
        }
        if (results && results.rowCount > 0) {
          logger.trace("results: ", results);
          res.status(200).json({
            Name: req.body.name,
            Description: req.body.description,
            Date: req.body.date,
            CategoryID: req.body.categoryid,
            Body: req.body.body,
            TypeID: req.body.typeid,
          });
        }
      }
    );
  },

  getAllArticles(req, res, next) {
    logger.trace("Get aangeroepen op /article/");
    const type = req.query.type;
    const category = req.query.category;
    let info = [];
    let sqlQuery;

    if (type && !category) {
      sqlQuery = 'SELECT "article".*, "type"."Name" AS "type", "category"."Name" AS "category" FROM "article" INNER JOIN "category" ON "article"."CategoryID" = "category"."ID" INNER JOIN "type" ON "article"."TypeID" = "type"."ID" WHERE "type"."ID" = $1'
      info = [type]
    } else if (category && !type) {
      sqlQuery = 'SELECT "article".*, "type"."Name" AS "type", "category"."Name" AS "category" FROM "article" INNER JOIN "category" ON "article"."CategoryID" = "category"."ID" INNER JOIN "type" ON "article"."TypeID" = "type"."ID" WHERE "category"."ID" = $1'
      info = [category]
    } else if (!type && !category) {
      sqlQuery = 'SELECT "article".*, "type"."Name" AS "type", "category"."Name" AS "category" FROM "article" INNER JOIN "category" ON "article"."CategoryID" = "category"."ID" INNER JOIN "type" ON "article"."TypeID" = "type"."ID"'
      info = []
    }


    pool.query(sqlQuery, info, (err, results, next) => {
      if (err) {
        res.status(400).json({
          message: "GetAll Failed!",
          error: err,
        });
      }
      if (results) {
        logger.trace("results: ", results);
        res.status(200).json({
          result: results.rows,
        });
      }
    });
  },
};
