const router = require("express").Router();
const articleController = require("../controllers/article.controller");
const authController = require("../controllers/authentication.controller");
const bodyParser = require("body-parser");
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post(
  "/article/create",
  authController.validateToken,
  articleController.validateArticle,
  articleController.createArticle
);

router.delete(
    "/article/:articleId/delete",
    authController.validateToken,
    articleController.deleteArticle
)

router.put(
    "/article/:articleId",
    authController.validateToken,
    articleController.validateArticle,
    articleController.updateArticle
)

router.get(
    "/article",
    authController.validateToken,
    articleController.getAllArticles
)

module.exports = router;
