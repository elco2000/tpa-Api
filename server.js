const config = require("./src/config/config");
const logger = config.logger;
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const authenticationroutes = require("./src/routes/authentication.routes");
const articleroutes = require("./src/routes/article.routes");

app.use("/api", authenticationroutes);

app.use("/api", articleroutes);


app.use(function (req, res, next) {
    res.status(404).send("Sorry dit kan niet gevonden worden!");
});

app.use(function (err, req, res, next) {
    logger.error(err.stack);
    res.status(500).send("Iets is kapot!");
});

app.listen(port, () =>
    console.log(`Example app listening at http://localhost:${port}`)
);

module.exports = app;