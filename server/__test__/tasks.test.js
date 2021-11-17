const request = require("supertest");
const app = require("../app");
const { sequelize, Class } = require("../models");
const song = require("./file/song");
// const jest = require("jest");

const { closeRedis, initRedis } = require("../helpers/redis");

let token;

afterAll((done) => {
  closeRedis();
  done();
});

beforeAll((done) => {
  // set initial data
  let redis;
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
      // let redis;
      // redis = initRedis();
      // return redis.del("2998843");
    })
    // .then(() => {
    //   return redis.disconnect();
    // })
    // .then(() => {
    //   done();
    // })
    .catch((err) => {
      done(err);
    });
});
describe("POSTS /tasks", () => {
  test("201 success create tasks", (done) => {
    request(app)
      .post("/tasks")
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
        expect(body).toHaveProperty("result");
        expect(body.result).toHaveProperty("name", "task one");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("400 failed create task bad request", (done) => {
    request(app)
      .post("/tasks")
      .send({
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
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", ["Task name can't be empty"]);
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
        expect(body.length).toBe(3);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("200 success get tasks by classId", (done) => {
    request(app)
      .get("/tasks?classId=1")
      .set({
        access_token: token,
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(Array.isArray(body)).toBeTruthy();
        expect(body.length).toBe(3);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("401 failed get tasks", (done) => {
    request(app)
      .get("/tasks")
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(401);
        expect(body.message).toBe("jwt must be provided");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("GET /tasks/:classId", () => {
  test("200 success get tasks class id", (done) => {
    request(app)
      .get("/tasks/class/1")
      .set({
        access_token: token,
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(Array.isArray(body)).toBeTruthy();
        // expect(body.length).toBe(3);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("400 failed get tasks by classId", (done) => {
    request(app)
      .get("/tasks/class/not_number")
      .set({
        access_token: token,
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(400);
        expect(body.message).toBe("Please check your ID");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("404 failed get tasks by id not found", (done) => {
    request(app)
      .get("/tasks/class/99")
      .set({
        access_token: token,
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(404);
        expect(body.message).toBe("Class with ID 99 not found");
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
      .get(`/tasks/1`)
      .set({
        access_token: token,
      })
      .then((response) => {
        const { body, status } = response;
        // expect(status).toBe(200);
        // expect(body).toHaveProperty("name", "Twinkle Twinkle Little Star");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("404 failed get task cause invalid id", (done) => {
    request(app)
      .get(`/tasks/${99}`)
      .set({
        access_token: token,
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(404);
        expect(body).toHaveProperty("message", "Task with ID 99 not found");
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
        expect(body).toHaveProperty("message", "Task with ID 1 Updated");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("404 failed update task cause invalid id", (done) => {
    request(app)
      .put(`/tasks/${99}`)
      .set({
        access_token: token,
      })
      .send({
        name: "test five",
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(404);
        expect(body).toHaveProperty("message", "Task with ID 99 not found");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("404 failed update task cause invalid class id", (done) => {
    request(app)
      .put(`/tasks/${1}`)
      .set({
        access_token: token,
      })
      .send({
        name: "test five",
        classId: 200,
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(404);
        expect(body).toHaveProperty("message");
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
        expect(body).toHaveProperty("message", "Deleted task with ID 1");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("404 failed delete task cause invalid id", (done) => {
    request(app)
      .delete(`/tasks/${99}`)
      .set({
        access_token: token,
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(404);
        expect(body).toHaveProperty("message", "Task with ID 99 not found");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("GET /tasks/search-songs", () => {
  jest.setTimeout(30000);
  test("200 success search songs", (done) => {
    request(app)
      .get(`/tasks/search-songs?artist=coldplay`)
      .set({
        access_token: token,
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(Array.isArray(body)).toBeTruthy();
        expect(body[0]).toHaveProperty("id");
        expect(body[0]).toHaveProperty("title");
        expect(body[0]).toHaveProperty("url");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("GET /tasks/search-songs/:songId", () => {
  jest.setTimeout(10000);
  test("200 success get song details", (done) => {
    let redis;
    redis = initRedis();
    redis
      .del("2998843")
      .then(() => {
        return request(app).get(`/tasks/search-songs/2998843`).set({
          access_token: token,
        });
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(body).toHaveProperty("id");
        expect(body).toHaveProperty("title");
        expect(body).toHaveProperty("lyrics");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("200 success get song details from cache", (done) => {
    request(app)
      .get(`/tasks/search-songs/2998843`)
      .set({
        access_token: token,
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(body).toHaveProperty("id");
        expect(body).toHaveProperty("title");
        expect(body).toHaveProperty("lyrics");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("POST /tasks/question", () => {
  test("200 success question", (done) => {
    request(app)
      .post(`/tasks/question`)
      .set({
        access_token: token,
      })
      .send({
        id: 2998843,
        song: song,
        index: [2, 3, 5],
        classId: 1,
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test("200 success question", (done) => {
    let redis;
    redis = initRedis();
    redis
      .del("2998843")
      .then(() => {
        return request(app)
          .post(`/tasks/question`)
          .set({
            access_token: token,
          })
          .send({
            id: 2998843,
            song: song,
            index: [2, 3, 5],
            classId: 1,
          });
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("POST /tasks/get-listening-score", () => {
  test("200 success get listening score", (done) => {
    request(app)
      .post(`/tasks/get-listening-score`)
      .set({
        access_token: token,
      })
      .send({
        answer: [
          "The legends and the myths",
          "Achilles and his gold",
          "Hercules and his gifts",
        ],
        index: [2, 3, 5],
        id: 2998843,
        song: song,
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("200 success get listening score from cache", (done) => {
    let redis;
    redis = initRedis();
    redis
      .set("2998843", JSON.stringify(song))
      .then(() => {
        return request(app)
          .post(`/tasks/get-listening-score`)
          .set({
            access_token: token,
          })
          .send({
            answer: [
              "The legends and the myths",
              "Achilles and his gold",
              "Hercules and his gifts",
            ],
            index: [2, 3, 5],
            id: 2998843,
            song: song,
          });
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
