const request = require("supertest");
const app = require("../app");

let token;

beforeAll((done) => {
  // set initial data
  request(app)
    .post("/login")
    .send({
      email: "soap@mail.com",
      password: "password",
    })
    .then((response) => {
      const { body } = response;
      token = body.access_token;
      done();
    })
    .catch((err) => {
      done(err);
    });
});

describe("GET /scores", () => {
  test("200 success get scores", (done) => {
    request(app)
      .get("/scores")
      .set({
        access_token: token,
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(Array.isArray(body)).toBeTruthy();
        expect(body[0]).toHaveProperty("id");
        expect(body[0]).toHaveProperty("score");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("GET /scores/:id", () => {
  test("200 success get scores by id", (done) => {
    request(app)
      .get(`/scores/${1}`)
      .set({
        access_token: token,
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(body).toHaveProperty("id");
        expect(body).toHaveProperty("score");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("404 failed get score because id not found", (done) => {
    request(app)
      .get(`/scores/${100}`)
      .set({
        access_token: token,
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(404);
        expect(body).toHaveProperty("message", "Score with ID 100 not found");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
