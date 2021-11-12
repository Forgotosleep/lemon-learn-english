const request = require("supertest");
const app = require("../app");

const { sequelize, Class } = require("../models");
const { queryInterface } = sequelize;

// beforeAll((done) => {
//   // set initial data
//   /*

//     */
//   // Class.create();
// });

// afterAll((done) => {
//   // clean up
// });

// insert token
const token = "<access_token>";

describe("POSTS /tasks", () => {
  test("201 success create tasks", (done) => {
    request(app)
      .post("/tasks/add")
      .send({
        name: "task one",
        description: "task one description",
        classId: 1,
        soundUrl: "www.example.com",
        question: "question",
      })
      .set({
        access_token: token,
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(201);
        expect(body).toHaveProperty("message", "Task Created");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("GET /tasks", () => {
  test("200 success get tasks", (done) => {
    request(app)
      .get("/tasks")
      .set({
        access_token: token,
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(Array.isArray(body)).toBeTruthy();
        expect(body.length).toBe(1);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("GET /tasks/:id", () => {
  test("200 success get task by id", (done) => {
    request(app)
      .get(`/tasks/${1}`)
      .set({
        access_token: token,
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(body).toHaveProperty("name", "task one");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("UPDATE /tasks", () => {
  test("200 success update tasks", (done) => {
    request(app)
      .put(`/tasks/${1}`)
      .send({
        name: "test five",
      })
      .set({
        access_token: token,
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(body).toHaveProperty("message", "Task Updated");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("DELETE /tasks", () => {
  test("200 success delete tasks", (done) => {
    request(app)
      .delete(`/tasks/${1}`)
      .set({
        access_token: token,
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(body).toHaveProperty("message", "Task Deleted");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
