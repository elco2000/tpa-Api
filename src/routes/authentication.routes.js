const router = require("express").Router();
const authController = require("../controllers/authentication.controller");
const bodyParser = require("body-parser");
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post("/login", authController.validateLogin, authController.login);
router.post(
    "/register",
    authController.validateRegister,
    authController.register
);

router.get("/user/:userId", authController.validateToken, authController.getUserById)
module.exports = router;