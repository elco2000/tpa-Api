const router = require("express").Router();
const articleController = require("../controllers/article.controller");
const authController = require("../controllers/authentication.controller");
const bodyParser = require("body-parser");
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post(
  "/article/create",
  authController.validateToken,
  articleController.createArticle
);

module.exports = router;
