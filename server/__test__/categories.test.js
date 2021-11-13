const request = require("supertest");
const app = require("../app");

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJzYXlha2FAbWFpbC5jb20iLCJuYW1lIjoic2F5YWthIiwicm9sZSI6InRlYWNoZXIiLCJpYXQiOjE2MzY3NTk2MDV9.CiP7QMvhu1lipMFkj4YtHJSAGlcryMuwb65pC0pR1V8";

describe("POSTS /categories", () => {
  test("201 success create category", (done) => {
    request(app)
      .post("/categories")
      .send({
        name: "listening",
      })
      .set({
        access_token: token,
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(201);
        expect(body).toHaveProperty("message", "Success add category");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("400 [failed] create category bad request", (done) => {
    request(app)
      .post("/categories")
      .send({
        name: "listening",
      })
      .set({
        access_token: token,
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(400);
        expect(body).toHaveProperty("message");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("GET /categories", () => {
  test("200 success get categories", (done) => {
    request(app)
      .get("/categories")
      .set({
        access_token: token,
      })
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

describe("GET /categories/:id", () => {
  test("200 success get categories by id", (done) => {
    request(app)
      .get(`/categories/${1}`)
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

  test("404 failed get categories because id not found", (done) => {
    request(app)
      .get(`/categories/${67}`)
      .set({
        access_token: token,
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(404);
        expect(body).toHaveProperty("message", "Category with ID 67 not found");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("401 failed get categories because id not number", (done) => {
    request(app)
      .get(`/categories/not_number_id`)
      .set({
        access_token: token,
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Please check your ID");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("UPDATE /categories/:id", () => {
  test("200 success update categories", (done) => {
    request(app)
      .put(`/categories/${3}`)
      .set({
        access_token: token,
      })
      .send({
        name: "grammar",
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(body).toHaveProperty("message", "Success update category");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("404 failed update category because id not found", (done) => {
    request(app)
      .put(`/categories/${67}`)
      .set({
        access_token: token,
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(404);
        expect(body).toHaveProperty("message", "Category with ID 67 not found");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("401 failed update category because id not number", (done) => {
    request(app)
      .put(`/categories/not_number_id`)
      .set({
        access_token: token,
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Please check your ID");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("DELETE /categories/:id", () => {
  test("200 success delete category", (done) => {
    request(app)
      .delete(`/categories/${3}`)
      .set({
        access_token: token,
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(body).toHaveProperty("message", "Success delete category");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("404 failed delete category because id not found", (done) => {
    request(app)
      .delete(`/categories/${67}`)
      .set({
        access_token: token,
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(404);
        expect(body).toHaveProperty("message", "Category with ID 67 not found");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("401 failed delete category because id not number", (done) => {
    request(app)
      .delete(`/categories/not_number_id`)
      .set({
        access_token: token,
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Please check your ID");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
