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

describe("POST /materials", () => {
  test("201 succes create materials", (done) => {
    request(app)
      .post("/materials")
      .send({
        name: "test materials",
        description: "description of test materials",
        materialUrl: "www.youtube.com",
        classId: 1,
      })
      .set({
        access_token: token,
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(201);
        expect(body).toHaveProperty(
          "message",
          "Succeessfully added a new material"
        );
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("400 failed create materials", (done) => {
    request(app)
      .post("/materials")
      .send({
        name: "test failed materials",
        materialUrl: "www.youtube.com",
        classID: 1,
      })
      .set({
        access_token: token,
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(400);
        expect(body).toHaveProperty("message");
        expect(body.message[0]).toBe("Description can't be empty");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("GET /materials", () => {
  test("200 success get materials", (done) => {
    request(app)
      .get("/materials")
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
});

describe("GET /materials/:id", () => {
  test("200 success get materials by id", (done) => {
    request(app)
      .get(`/materials/${1}`)
      .set({
        access_token: token,
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(body).toHaveProperty("id");
        expect(body).toHaveProperty("name");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("404 failed get materials because id not found", (done) => {
    request(app)
      .get(`/materials/${100}`)
      .set({
        access_token: token,
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(404);
        expect(body).toHaveProperty(
          "message",
          "Material with ID 100 not found"
        );
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("UPDATE /materials/:id", () => {
  test("200 success update materials", (done) => {
    request(app)
      .put(`/materials/${3}`)
      .set({
        access_token: token,
      })
      .send({
        name: "materials name updated",
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(body).toHaveProperty(
          "message",
          "Succeessfully updated a material"
        );
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("404 failed update material because id not found", (done) => {
    request(app)
      .put(`/materials/${67}`)
      .set({
        access_token: token,
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(404);
        expect(body).toHaveProperty("message", "Material with ID 67 not found");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("400 failed update material because id not number", (done) => {
    request(app)
      .put(`/materials/not_number_id`)
      .set({
        access_token: token,
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

describe("DELETE /materials/:id", () => {
  test("200 success delete material", (done) => {
    request(app)
      .delete(`/materials/${3}`)
      .set({
        access_token: token,
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(body).toHaveProperty("id", 3);
        expect(body).toHaveProperty(
          "description",
          "description of test materials"
        );
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("404 failed delete material because id not found", (done) => {
    request(app)
      .delete(`/materials/${67}`)
      .set({
        access_token: token,
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(404);
        expect(body).toHaveProperty("message", "Material with ID 67 not found");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("400 failed delete material because id not number", (done) => {
    request(app)
      .delete(`/materials/not_number_id`)
      .set({
        access_token: token,
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
