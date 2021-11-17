const request = require("supertest");
const app = require("../app");

let token;

const { closeRedis } = require("../helpers/redis");
afterAll((done) => {
  closeRedis();
  done();
});

beforeAll((done) => {
  // set initial data
  request(app)
    .post("/login")
    .send({
      email: "mason@mail.com",
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

// set initial data
describe("GET /scores", () => {
  test("200 success get all score", (done) => {
    request(app)
      .get("/scores")

      .set({ access_token: token })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(Array.isArray(body)).toBeTruthy();
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("GET /scores/:id", () => {
  test("200 success get score by id", (done) => {
    request(app)
      .get(`/scores/2`)
      .set({
        access_token: token,
      })
      .then((response) => {
        const { body, status } = response;
        console.log(response);
        expect(status).toBe(200);
        expect(body).toHaveProperty("id", 2);
        expect(body).toHaveProperty("score");
        expect(body).toHaveProperty("taskId");
        expect(body).toHaveProperty("answer");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("Failed get score by id", () => {
  test("404 failed get score by id not found", (done) => {
    request(app)
      .get("/scores/222")
      .set({
        access_token: token,
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(404);
        expect(body).toHaveProperty("message", "Score with ID 222 not found");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

// describe("POSTS /scores", () => {
//   test("201 success create scores", (done) => {
//     request(app)
//       .post("/scores")
//       .send({
//         score: "90",
//         studentId: 1,
//         taskId: 1,
//         soundUrl: "https://www.youtube.com/watch?v=IIZn_cEP9Jg",
//         answer: "https://www.youtube.com/watch?v=IIZn_cEP9Jg",
//       })
//       .set({
//         access_token: token,
//       })
//       .then((response) => {
//         const { body, status } = response;
//         expect(status).toBe(201);
//         expect(body).toHaveProperty("score", 90);
//         expect(body).toHaveProperty("studentId", 1);
//         expect(body).toHaveProperty("taskId", 1);
//         done();
//       })
//       .catch((err) => {
//         done(err);
//       });
//   });
// });

// describe("Failed create score", () => {
//   test("400 failed create score", (done) => {
//     request(app)
//       .post("/scores")
//       .send({
//         score: "score test",
//         studentId: 3,
//         taskId: 1,
//         soundUrl: "url",
//         answer: "answer",
//       })
//       .set({
//         access_token: token,
//       })
//       .then((response) => {
//         const { body, status } = response;
//         expect(status).toBe(400);
//         expect(body).toHaveProperty("message", ["Score has to be a number"]);
//         done();
//       })
//       .catch((err) => {
//         done(err);
//       });
//   });
// });

describe("UPDATE /scores/:id", () => {
  test("200 success update score", (done) => {
    request(app)
      .put("/scores/2")
      .set({
        access_token: token,
      })
      .send({
        score: "98",
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(body).toHaveProperty("score");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("Edit failed", () => {
  test("404 failed update edit", (done) => {
    request(app)
      .put("/scores/222")
      .set({
        access_token: token,
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(404);
        expect(body).toHaveProperty("message", "Score with ID 222 not found");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("DELETE /scores/:id", () => {
  test("200 success delete class", (done) => {
    request(app)
      .delete("/scores/2")
      .set({
        access_token: token,
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(body).toHaveProperty("score");
        expect(body).toHaveProperty("studentId");
        expect(body).toHaveProperty("taskId");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
