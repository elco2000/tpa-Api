process.env.DB_DATABASE = process.env.DB_DATABASE || 'postgres://postgres:root@localhost:5432/tpa_test';
process.env.NODE_ENV = "testing";
process.env.LOGLEVEL = "error";
console.log(`Running tests using database '${process.env.DB_DATABASE}'`);

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../server");
const pool = require("../../src/config/database");

chai.should();
chai.use(chaiHttp);

const CLEAR_DB = 'DELETE FROM "article"'
const INSERT_QUERY_ARTICLE = 'INSERT INTO "article" ("ID", "Name", "Description", "Date", "CategoryID", "Body", "UserID", "TypeID") VALUES '+
    "(1, 'Nieuw personeel!', 'Nieuwe gezichten op de afdeling!', '2020-05-21', '1', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', 31, 1),"+
    "(2, 'Oud personeel verlaat de organisatie!', 'Verjonging de nieuwe trend op de werkvloer met gevolg van ontslag van oude personeel.', '2020-05-22', '1', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', 31, 1)";

const INSERT_QUERY_USER = 'INSERT INTO "user" ("ID", "First_Name", "Last_Name", "Email", "Password", "RoleID") VALUES' +
    "(31, 'Bob', 'Versijder', 'mark@gmail.com', 'secret', 1)"

describe("2 Article", function(){
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
})