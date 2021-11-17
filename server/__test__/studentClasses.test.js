const request = require("supertest");
const app = require("../app");

let token; // teacher token
let studentToken;
let studentToken2;
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
      email: "mactavish@mail.com",
      password: "password",
    })
    .then((response) => {
      const { body } = response;
      studentToken = body.access_token;
      return request(app).post("/login").send({
        email: "mason@mail.com",
        password: "password",
      });
    })
    .then((response) => {
      const { body } = response;
      token = body.access_token;
      return request(app).post("/login").send({
        email: "mario@mail.com",
        password: "password",
      });
    })
    .then((response) => {
      const { body } = response;
      studentToken2 = body.access_token;
      done();
    })
    .catch((err) => {
      done(err);
    });
});

describe("POST /student-class/:classId", () => {
  test("201 success student enrolled to class", (done) => {
    request(app)
      .post("/student-class/1")
      .set({
        access_token: studentToken2,
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(201);
        expect(body).toHaveProperty(
          "message",
          "Success adding student to the class"
        );
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("400 [failed] student enrolled to class already enrolled", (done) => {
    request(app)
      .post("/student-class/1")
      .set({
        access_token: studentToken2,
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(400);
        expect(body).toHaveProperty(
          "message",
          "User is already enrolled in the class"
        );
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("400 failed student enrolled to class, bad request", (done) => {
    request(app)
      .post("/student-class/not_right")
      .set({
        access_token: studentToken2,
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", "Invalid input data type");
        done();
      })
      .catch((err) => {
        done(err);
      });
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

describe("GET /student-class/:classId", () => {
  test("200 success Gets all student that is enrolled in a specific class", (done) => {
    request(app)
      .get("/student-class/1")
      .set({
        access_token: token,
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(Array.isArray(body.result)).toBeTruthy();
        expect(body.result[0]).toHaveProperty("id");
        expect(body.result[0]).toHaveProperty("student");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("200 success Gets all student that is enrolled in a specific class", (done) => {
    request(app)
      .get("/student-class/1?studentName=mactavish")
      .set({
        access_token: token,
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(Array.isArray(body.result)).toBeTruthy();
        expect(body.result.length).toBe(1);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("404 failed  class not found", (done) => {
    request(app)
      .get("/student-class/55")
      .set({
        access_token: token,
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(404);
        expect(body).toHaveProperty("message", "Class with ID 55 not found");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("PATCH /student-class/hide/:id", () => {
  test("200 success student want unenrolled from particular class", (done) => {
    request(app)
      .patch("/student-class/hide/1")
      .set({
        access_token: studentToken,
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(body).toHaveProperty("message", "Success update status");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("404 failed student want un-enrolled from particular class, class not found", (done) => {
    request(app)
      .patch("/student-class/hide/5")
      .set({
        access_token: studentToken,
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(404);
        expect(body).toHaveProperty(
          "message",
          "Student Class Data with ID 5 not found"
        );
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("403 failed student want unenrolled from particular class, student not regitered", (done) => {
    request(app)
      .patch("/student-class/hide/2")
      .set({
        access_token: studentToken2,
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(403);
        expect(body).toHaveProperty("message", "Unauthorized access");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("PATCH /student-class/:id", () => {
  test("200 success student want rerolled to previously unrerolled particular class", (done) => {
    request(app)
      .patch("/student-class/1")
      .set({
        access_token: studentToken,
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(body).toHaveProperty(
          "message",
          "Success updating student's status"
        );

        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("403 success student want rerolled to previously unrerolled particular class", (done) => {
    request(app)
      .patch("/student-class/2")
      .set({
        access_token: studentToken2,
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(403);
        expect(body).toHaveProperty("message", "Unauthorized access");

        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
