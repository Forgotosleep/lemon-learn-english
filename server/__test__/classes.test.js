const request = require("supertest");
const app = require("../app");

let token;

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

describe("POSTS /classes", () => {
  test("201 success create class", (done) => {
    request(app)
      .post("/classes")
      .send({
        name: "class test",
        levelId: 3,
        categoryId: 1,
      })
      .set({
        access_token: token,
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(201);
        expect(body).toHaveProperty("name", "class test");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("400 failed create class", (done) => {
    request(app)
      .post("/classes")
      .send({
        name: "class test",
        levelId: 3,
        categoryId: 1,
      })
      .set({
        access_token: token,
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", "duplicate class");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("GET /classes", () => {
  test("200 success get class", (done) => {
    request(app)
      .get("/classes")
      .set({
        access_token: token,
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(body).toHaveProperty("result");
        expect(Array.isArray(body.result)).toBeTruthy();
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("200 success get class with query teacherName", (done) => {
    request(app)
      .get("/classes?teacherName=Mason")
      .set({
        access_token: token,
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(body).toHaveProperty("result");
        expect(Array.isArray(body.result)).toBeTruthy();
        expect(body.result.length).toBe(3);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("GET /classes/active", () => {
  test("200 success get class with active status", (done) => {
    request(app)
      .get("/classes/active")
      .set({
        access_token: token,
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(body).toHaveProperty("result");
        expect(Array.isArray(body.result)).toBeTruthy();
        expect(body.result[0]).toHaveProperty("status", "active");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("200 success get active class with query teacherName", (done) => {
    request(app)
      .get("/classes/active?teacherName=Mason")
      .set({
        access_token: token,
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(body).toHaveProperty("result");
        expect(Array.isArray(body.result)).toBeTruthy();
        expect(body.result.length).toBe(3);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("GET /classes/:id", () => {
  test("200 success get class by id", (done) => {
    request(app)
      .get("/classes/1")
      .set({
        access_token: token,
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(body).toHaveProperty("id", 1);
        expect(body).toHaveProperty("name");
        expect(body).toHaveProperty("teacherId");
        expect(body).toHaveProperty("levelId");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("404 failed get class by id not found", (done) => {
    request(app)
      .get("/classes/222")
      .set({
        access_token: token,
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(404);
        expect(body).toHaveProperty("message", "Class with ID 222 not found");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("GET /teacherClasses", () => {
  test("200 success get class by teacher id", (done) => {
    request(app)
      .get("/classes/teacherClasses")
      .set({
        access_token: token,
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(Array.isArray(body)).toBeTruthy();
        expect(body[0]).toHaveProperty("id");
        expect(body[0]).toHaveProperty("name");
        expect(body[0]).toHaveProperty("teacherId");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  // test("404 failed get class by id not found", (done) => {
  //   request(app)
  //     .get("/classes/222")
  //     .set({
  //       access_token: token,
  //     })
  //     .then((response) => {
  //       const { body, status } = response;
  //       expect(status).toBe(404);
  //       expect(body).toHaveProperty("message", "Class with ID 222 not found");
  //       done();
  //     })
  //     .catch((err) => {
  //       done(err);
  //     });
  // });
});

describe("UPDATE /classes/:id", () => {
  test("200 success update class", (done) => {
    request(app)
      .put("/classes/3")
      .set({
        access_token: token,
      })
      .send({
        name: "new class name",
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(body).toHaveProperty("name", "new class name");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("404 failed update class", (done) => {
    request(app)
      .put("/classes/222")
      .set({
        access_token: token,
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(404);
        expect(body).toHaveProperty("message", "Class with ID 222 not found");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("DELETE /classes/:id", () => {
  test("200 success delete class", (done) => {
    request(app)
      .delete("/classes/3")
      .set({
        access_token: token,
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(body).toHaveProperty(
          "message",
          "Successfully deleted Class new class name"
        );
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("404 failed update class", (done) => {
    request(app)
      .delete("/classes/222")
      .set({
        access_token: token,
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(404);
        expect(body).toHaveProperty("message", "Class with ID 222 not found");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

// describe("PATCH /classes/:id", () => {
//   test("200 success give rate to a class", (done) => {
//     request(app)
//       .patch("/classes/3")
//       .set({
//         access_token: token,
//       })
//       .send({
//         ratings: 4,
//       })
//       .then((response) => {
//         const { body, status } = response;
//         expect(status).toBe(200);
//         expect(body).toHaveProperty(
//           "message",
//           "Successfully deleted Class new class name"
//         );
//         done();
//       })
//       .catch((err) => {
//         done(err);
//       });
//   });

//   test("404 failed update class", (done) => {
//     request(app)
//       .delete("/classes/222")
//       .set({
//         access_token: token,
//       })
//       .then((response) => {
//         const { body, status } = response;
//         expect(status).toBe(404);
//         expect(body).toHaveProperty("message", "Class with ID 222 not found");
//         done();
//       })
//       .catch((err) => {
//         done(err);
//       });
//   });
// });
