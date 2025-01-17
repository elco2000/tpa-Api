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

const CLEAR_DB = 'DELETE FROM "user"';
const INSERT_QUERY =
  'INSERT INTO "user" ("ID", "First_Name", "Last_Name", "Email", "Password", "RoleID", "Job", "Sector") VALUES ' +
  "(1, 'Mark', 'Sander', 'mark@gmail.com', 'secret', 1, 'horseverzorger', 'paardensport')," +
  "(2, 'Marci', 'Ngasiman', 'marci@gmail.com', 'supersecret', 2, 'horserijder', 'horsesport')";

describe("1 Authenticatie", function () {
  before((done) => {
    pool.query(CLEAR_DB, (err, rows, fields) => {
      if (err) {
        console.log(`beforeEach CLEAR error: ${err}`);
        done(err);
      } else {
        done();
      }
    });
  });
  describe("1.1 Registreren - POST /api/register", () => {
    it("1.1.1 should throw an error when no firstname is provided", (done) => {
      chai
        .request(server)
        .post("/api/register")
        .send({
          lastname: "LastName ",
          email: "test@test.nl",
          password: "secret",
          job: "Begeleider",
          sector: "Hulp",
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");

          const response = res.body;
          response.should.have.property("error").which.is.a("String");
          response.should.have.property("datetime").which.is.a("String");
          done();
        });
    });

    it("1.1.2 should throw an error when email is invalid", (done) => {
      chai
        .request(server)
        .post("/api/register")
        .send({
          firstname: "FirstName",
          lastname: "LastName",
          email: "pietpaulusma",
          password: "secret",
          job: "Begeleider",
          sector: "Hulp",
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");

          const response = res.body;
          response.should.have.property("error").which.is.a("String");
          response.should.have.property("datetime").which.is.a("String");
          done();
        });
    });

    it("1.1.3 should throw an error when password is invalid", (done) => {
      chai
        .request(server)
        .post("/api/register")
        .send({
          firstname: "FirstName",
          lastname: "LastName",
          email: "test@test.nl",
          password: 1245,
          job: "Begeleider",
          sector: "Hulp",
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");

          const response = res.body;
          response.should.have.property("error").which.is.a("String");
          response.should.have.property("datetime").which.is.a("String");
          done();
        });
    });

    it("1.1.4 should throw an error when user already exist", (done) => {
      pool.query(INSERT_QUERY, (error, result) => {
        if (error) console.log(error);
        if (result) {
          chai
            .request(server)
            .post("/api/register")
            .send({
              firstname: "Mark",
              lastname: "Sander",
              email: "mArk@gmail.com",
              password: "secret",
              job: "Begeleider",
              sector: "Hulp",
            })
            .end((err, res) => {
              res.should.have.status(400);
              res.body.should.be.a("object");

              const response = res.body;
              response.should.have.property("error").which.is.a("String");
              response.should.have.property("datetime").which.is.a("String");
              done();
            });
        }
      });
    });

    it("1.1.5 should return a token when providing valid information", (done) => {
      chai
        .request(server)
        .post("/api/register")
        .send({
          firstname: "FirstName",
          lastname: "LastName",
          email: "dutch@test.nl",
          password: "secret",
          job: "Begeleider",
          sector: "Hulp",
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");

          const response = res.body;
          response.should.have.property("token").which.is.a("string");
          response.should.have.property("username").which.is.a("string");
          done();
        });
    });
  });

  describe("1.2 Login - POST /api/login", () => {
    it("1.2.1 should throw an error when no email is provided", (done) => {
      chai
        .request(server)
        .post("/api/login")
        .send({
          password: "secret",
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");

          const response = res.body;
          response.should.have.property("error").which.is.a("String");
          response.should.have.property("datetime").which.is.a("String");
          done();
        });
    });

    it("1.2.2 should throw an error when email is invalid", (done) => {
      chai
        .request(server)
        .post("/api/login")
        .send({
          email: 1234,
          password: "secret",
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");

          const response = res.body;
          response.should.have.property("error").which.is.a("String");
          response.should.have.property("datetime").which.is.a("String");
          done();
        });
    });

    it("1.2.3 should throw an error when password is invalid", (done) => {
      chai
        .request(server)
        .post("/api/login")
        .send({
          email: "test@test.nl",
          password: 1245,
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");

          const response = res.body;
          response.should.have.property("error").which.is.a("String");
          response.should.have.property("datetime").which.is.a("String");
          done();
        });
    });

    it("1.2.4 should throw an error when user does not exist", (done) => {
      chai
        .request(server)
        .post("/api/login")
        .send({
          email: "autoliefhebberelco@gmail.com",
          password: "secret",
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

    it("1.2.5 should return a token when providing valid information", (done) => {
      chai
        .request(server)
        .post("/api/login")
        .send({
          email: "mark@gmail.com",
          password: "secret",
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          const response = res.body;
          response.should.have.property("token").which.is.a("string");
          response.should.have.property("username").which.is.a("string");
          done();
        });
    });
  });

  describe("1.3 getUserByID - GET /user/:userId", () => {
    it("1.3.1 should throw an error when ID is invalid", (done) => {
      jwt.sign({ id: 1 }, "secret", { expiresIn: "2h" }, (err, token) => {
        chai
          .request(server)
          .get("/api/user/999")
          .set("authorization", "Bearer " + token)
          .end((err, res) => {
            res.should.have.status(404);
            res.body.should.be.a("object");

            const response = res.body;
            response.should.have.property("message").which.is.a("String");
            //response.should.have.property("error").which.is.a("String");
            //response.should.have.propert y("datetime").which.is.a("String");
            done();
          });
      });
    });

    it("1.3.2 should return valid info when an ID is present", (done) => {
      jwt.sign({ id: 1 }, "secret", { expiresIn: "2h" }, (err, token) => {
        chai
          .request(server)
          .get("/api/user/1")
          .set("authorization", "Bearer " + token)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");

            let response = res.body;
            let { First_Name, Last_Name, Email, Job, Sector, RoleID } = response;
            First_Name.should.be.a("string").that.equals("Mark");
            Last_Name.should.be.a("string").that.equals("Sander");
            Email.should.be.a("string").that.equals("mark@gmail.com");
            Job.should.be.a("string").that.equals("horseverzorger");
            Sector.should.be.a("string").that.equals("paardensport");
            RoleID.should.be.a("number").that.equals(1);
            done();
          });
      });
    });

    it("1.3.3 should return error when not signed in", (done) => {
      jwt.sign({ id: 1 }, "secret", { expiresIn: "2h" }, (err, token) => {
        chai
          .request(server)
          .get("/api/user/1")
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
});
