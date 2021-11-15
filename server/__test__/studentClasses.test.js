const request = require("supertest");
const app = require("../app");

let token;
let studentToken;

beforeAll((done) => {
  // set initial data
  request(app)
    .post("/login")
    .send({
      email: "mactavish@mail.com",
      password: "password",
    })
    .then((response) => {
      const { body } = response;
      studentToken = body.access_token;
      done();
    })
    .catch((err) => {
      done(err);
    });
});

describe("GET /student-class", () => {
  test("200 success get student class", (done) => {
    request(app)
      .get("/student-class")
      .set({
        access_token: studentToken,
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(Array.isArray(body)).toBeTruthy();
        expect(body[0]).toHaveProperty("id");
        expect(body[0]).toHaveProperty("studentId");
        expect(body[0]).toHaveProperty("classId");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
