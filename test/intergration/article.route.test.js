process.env.DB_DATABASE =
  process.env.DB_DATABASE || "postgres://postgres:root@localhost:5432/tpa_test";
process.env.NODE_ENV = "testing";
process.env.LOGLEVEL = "error";
console.log(`Running tests using database '${process.env.DB_DATABASE}'`);

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../server");
const pool = require("../../src/config/database");
const jwt = require("jsonwebtoken");

chai.should();
chai.use(chaiHttp);

const CLEAR_DB = 'DELETE FROM "article"';
const CLEAR_DB_USER = 'DELETE FROM "user"';
const INSERT_QUERY_ARTICLE =
  'INSERT INTO "article" ("ID", "Name", "Description", "Date", "CategoryID", "Body", "UserID", "TypeID") VALUES ' +
  "(1, 'Nieuw personeel!', 'Nieuwe gezichten op de afdeling!', '2020-05-21', '1', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', 31, 1)," +
  "(2, 'Oud personeel!', 'Verjonging de nieuwe trend op de werkvloer met gevolg van ontslag van oude personeel.', '2020-05-22', '1', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', 31, 1)";

const INSERT_QUERY_USER =
  'INSERT INTO "user" ("ID", "First_Name", "Last_Name", "Email", "Password", "RoleID", "Job", "Sector") VALUES' +
  "(31, 'Bob', 'Versijder', 'mark@gmail.com', 'secret', 1, 'horseverzorger', 'peardensport')";

describe("2 Article", function () {
  before((done) => {
    pool.query(CLEAR_DB, (err, rows, fields) => {
      if (err) {
        console.log(`beforeEach CLEAR error: ${err}`);
        done(err);
      } else {
        pool.query(CLEAR_DB_USER, (err, rows, fields) => {
          if (err) {
            console.log(`beforeEach CLEAR error: ${err}`);
            done(err);
          } else {
            pool.query(INSERT_QUERY_USER, (err, rows, fields) => {
              if (err) {
                console.log(`beforeEach CLEAR error: ${err}`);
                done(err);
              } else {
                pool.query(INSERT_QUERY_ARTICLE, (err, rows, fields) => {
                  if (err) {
                    console.log(`beforeEach CLEAR error: ${err}`);
                    done(err);
                  } else {
                    done();
                  }
                });
              }
            });
          }
        });
      }
    });
  });

  after((done) => {
    pool.query(CLEAR_DB, (err, rows, fields) => {
      if (err) {
        console.log(`after CLEAR error: ${err}`);
        done(err);
      } else {
        done();
      }
    });
  });

  describe("2.1 Create Article - POST /api/article/create", () => {
    it("2.1.1 should throw an error when no name is provided", (done) => {
      jwt.sign({ id: 1 }, "secret", { expiresIn: "2h" }, (err, token) => {
        chai
          .request(server)
          .post("/api/article/create")
          .set("authorization", "Bearer " + token)
          .send({
            description: "here is some description",
            date: "01-01-2020",
            categoryid: 1,
            body: "here is the body",
            typeid: 1,
          })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a("object");

            const response = res.body;
            response.should.have.property("error").which.is.a("String");
            //response.should.have.property("datetime").which.is.a("String");
            done();
          });
      });
    });

    it("2.1.2 should throw an error when description is invalid", (done) => {
      jwt.sign({ id: 1 }, "secret", { expiresIn: "2h" }, (err, token) => {
        chai
          .request(server)
          .post("/api/article/create")
          .set("authorization", "Bearer " + token)
          .send({
            name: "title",
            description: 1,
            date: "01-01-2020",
            categoryid: 1,
            body: "here is the body",
            typeid: 1,
          })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a("object");

            const response = res.body;
            response.should.have.property("error").which.is.a("String");
            //response.should.have.property("datetime").which.is.a("String");
            done();
          });
      });
    });

    it("2.1.3 should throw an error when date is invalid", (done) => {
      jwt.sign({ id: 1 }, "secret", { expiresIn: "2h" }, (err, token) => {
        chai
          .request(server)
          .post("/api/article/create")
          .set("authorization", "Bearer " + token)
          .send({
            name: "title",
            description: "here is some description",
            date: 01012020,
            categoryid: 1,
            body: "here is the body",
            typeid: 1,
          })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a("object");

            const response = res.body;
            response.should.have.property("error").which.is.a("String");
            //response.should.have.property("datetime").which.is.a("String");
            done();
          });
      });
    });

    it("2.1.5 should throw an error when body is invalid", (done) => {
      jwt.sign({ id: 1 }, "secret", { expiresIn: "2h" }, (err, token) => {
        chai
          .request(server)
          .post("/api/article/create")
          .set("authorization", "Bearer " + token)
          .send({
            name: "title",
            description: "here is some description",
            date: "01-01-2020",
            categoryid: 1,
            body: 1,
            typeid: 1,
          })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a("object");

            const response = res.body;
            response.should.have.property("error").which.is.a("String");
            //response.should.have.property("datetime").which.is.a("String");
            done();
          });
      });
    });

    it("2.1.6 should create article when information is valid", (done) => {
      jwt.sign({ id: 1 }, "secret", { expiresIn: "2h" }, (err, token) => {
        chai
          .request(server)
          .post("/api/article/create")
          .set("authorization", "Bearer " + token)
          .send({
            name: "title",
            description: "here is some description",
            date: "2020-01-01",
            categoryid: 1,
            body: "here is the body",
            userid: 31,
            typeid: 1,
          })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");

            let response = res.body;
            let {
              Name,
              Description,
              Date,
              CategoryID,
              Body,
              UserID,
              TypeID,
            } = response;
            Name.should.be.a("string");
            Description.should.be.a("string");
            Date.should.be.a("string");
            CategoryID.should.be.a("number");
            Body.should.be.a("string");
            UserID.should.be.a("number");
            TypeID.should.be.a("number");

            done();
          });
      });
    });

    it("2.1.7 should return an error when not signed in", (done) => {
      jwt.sign({ id: 1 }, "secret", { expiresIn: "2h" }, (err, token) => {
        chai
          .request(server)
          .post("/api/article/create")
          .set("authorization", "Bearer ")
          .send({
            name: "title",
            description: "here is some description",
            date: "2020-01-01",
            categoryid: 1,
            body: "here is the body",
            userid: 31,
            typeid: 1,
          })
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.be.a("object");
            const response = res.body;
            response.should.have.property("error").which.is.a("String");
            response.should.have.property("datetime").which.is.a("String");
            done();
          });
      });
    });
  });

  describe("2.2 Delete Article - DELETE /api/article/:articleId/delete", () => {
    it("2.2.1 should return no info when an article is not present", (done) => {
      jwt.sign({ id: 1 }, "secret", { expiresIn: "2h" }, (err, token) => {
        chai
          .request(server)
          .delete("/api/article/99999/delete")
          .set("authorization", "Bearer " + token)
          .end((err, res) => {
            res.should.have.status(404);
            res.body.should.be.a("object");

            //const response = res.body;
            //response.should.have.property("error").which.is.a("String");
            //response.should.have.property("datetime").which.is.a("String");
            done();
          });
      });
    });

    it("2.2.2 should return valid info when an article is present", (done) => {
      jwt.sign({ id: 1 }, "secret", { expiresIn: "2h" }, (err, token) => {
        // pool.query(INSERT_QUERY_ARTICLE, (error, result) => {
        //   if (error) console.log(error);
        //   if (result) {
        chai
          .request(server)
          .delete("/api/article/1/delete")
          .set("authorization", "Bearer " + token)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            //const response = res.body;
            //response.should.have.property("error").which.is.a("String");
            //response.should.have.property("datetime").which.is.a("String");
            done();
          });
        //   }
        //   //done(error);
        // });
      });
    });

    it("2.2.3 should return an error when not signed in", (done) => {
      jwt.sign({ id: 1 }, "secret", { expiresIn: "2h" }, (err, token) => {
        chai
          .request(server)
          .delete("/api/article/:articleId/delete")
          .set("authorization", "Bearer ")
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.be.a("object");
            const response = res.body;
            response.should.have.property("error").which.is.a("String");
            response.should.have.property("datetime").which.is.a("String");
            done();
          });
      });
    });
  });

  describe("2.3 update Article - PUT /api/article/:articleId", () => {
    it("2.3.1 should return no info when an article is not present", (done) => {
      jwt.sign({ id: 1 }, "secret", { expiresIn: "2h" }, (err, token) => {
        chai
          .request(server)
          .put("/api/article/99999")
          .set("authorization", "Bearer " + token)
          .send({
            name: "title",
            description: "here is some description",
            date: "2020-01-01",
            categoryid: 1,
            body: "here is the body",
            typeid: 1,
          })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a("object");

            //const response = res.body;
            //response.should.have.property("error").which.is.a("String");
            //response.should.have.property("datetime").which.is.a("String");
            done();
          });
      });
    });

    it("2.3.2 should succesfully edit info when an article is present", (done) => {
      jwt.sign({ id: 1 }, "secret", { expiresIn: "2h" }, (err, token) => {
        // pool.query(INSERT_QUERY_ARTICLE, (error, result) => {
        //   if (error) console.log(error);
        //   if (result) {
        chai
          .request(server)
          .put("/api/article/2")
          .set("authorization", "Bearer " + token)
          .send({
            name: "title",
            description: "here is some description",
            date: "2020-01-01",
            categoryid: 1,
            body: "here is the body",
            typeid: 1,
          })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");

            let response = res.body;

            response.should.have.property("Name").which.is.a("String");
            response.should.have.property("Description").which.is.a("String");
            response.should.have.property("Date").which.is.a("String");
            response.should.have.property("CategoryID").which.is.a("number");
            response.should.have.property("Body").which.is.a("String");
            response.should.have.property("TypeID").which.is.a("number");

            // response.name.should.be.a("String");
            // response.description.should.be.a("String");
            // response.date.should.be.a("String");
            // response.categoryid.should.be.a("number");
            // response.body.should.be.a("String");
            // response.typeid.should.be.a("number");

            //const response = res.body;
            //response.should.have.property("error").which.is.a("String");
            //response.should.have.property("datetime").which.is.a("String");
            done();
          });
        //   }
        // });
      });
    });

    it("2.3.3 should return an error when not signed in", (done) => {
      jwt.sign({ id: 1 }, "secret", { expiresIn: "2h" }, (err, token) => {
        chai
          .request(server)
          .put("/api/article/1")
          .set("authorization", "Bearer ")
          .send({
            name: "title",
            description: "here is some description",
            date: "2020-01-01",
            categoryid: 1,
            body: "here is the body",
            userid: 31,
            typeid: 1,
          })
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.be.a("object");
            const response = res.body;
            response.should.have.property("error").which.is.a("String");
            response.should.have.property("datetime").which.is.a("String");
            done();
          });
      });
    });
  });

  describe("2.4 show Article - GET /api/article", () => {
    it("2.4.1 should provide invalid info when type is invalid", (done) => {
      jwt.sign({ id: 1 }, "secret", { expiresIn: "2h" }, (err, token) => {
        chai
          .request(server)
          .get("/api/article/?type=q")
          .set("authorization", "Bearer " + token)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a("object");
            const response = res.body;
            response.should.have.property("error").which.is.a("object");
            response.should.have.property("message").which.is.a("String");
            done();
          });
      });
    });

    it("2.4.2 should provide invalid info when category is invalid", (done) => {
      jwt.sign({ id: 1 }, "secret", { expiresIn: "2h" }, (err, token) => {
        chai
          .request(server)
          .get("/api/article/?category=q")
          .set("authorization", "Bearer " + token)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a("object");
            const response = res.body;
            response.should.have.property("error").which.is.a("object");
            response.should.have.property("message").which.is.a("String");
            done();
          });
      });
    });

    it("2.4.3 should provide valid info when category or type is not provided and database is empty", (done) => {
      jwt.sign({ id: 1 }, "secret", { expiresIn: "2h" }, (err, token) => {
        pool.query(CLEAR_DB, (error, result) => {
          if (error) console.log(error);
          if (result) {
            chai
              .request(server)
              .get("/api/article/")
              .set("authorization", "Bearer " + token)
              .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object");
                done();
              });
          }
        });
      });
    });
  });

  describe("2.5 Search article with name - GET /article/search/:articleSearchName", () => {
    it("2.5.1 should return an message when there are no results", (done) => {
      chai
        .request(server)
        .get("/api/article/search/autoachtbaan")
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");

          const response = res.body;
          response.should.have.property("message").which.is.a("String");
          done();
        });
    });

    it("2.5.2 should return valid information when there is a result", (done) => {
      pool.query(INSERT_QUERY_ARTICLE, (error, result) => {
        if (error) console.log(error);
        if (result) {
          chai
            .request(server)
            .get("/api/article/search/personeel")
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a("object");

              done();
            });
        }
      });
    });
  });
});
