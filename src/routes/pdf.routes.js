const router = require("express").Router();
const articleController = require("../controllers/article.controller");
const authController = require("../controllers/authentication.controller");
const bodyParser = require("body-parser");
const pdfController = require("../controllers/pdf.controller");
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get("/pdf", authController.validateToken, pdfController.sendPdf);

module.exports = router;
