var fs = require("fs");

module.exports = {
  sendPdf(req, res, next) {
    var data = fs.readFileSync("./assets/Proefdruk.pdf");
    res.contentType("application/pdf");
    res.send(data);
  },
};
