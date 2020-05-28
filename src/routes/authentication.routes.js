const router = require("express").Router();
const AuthController = require("../controllers/authentication.controller");
const bodyParser = require("body-parser");
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post("/login", AuthController.validateLogin, AuthController.login);
router.post(
    "/register",
    AuthController.validateRegister,
    AuthController.register
);

module.exports = router;