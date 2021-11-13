const request = require("supertest");
const app = require("../app");

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJtYXNvbkBtYWlsLmNvbSIsIm5hbWUiOiJNYXNvbiIsInJvbGUiOiJ0ZWFjaGVyIiwiaWF0IjoxNjM2NzY2MjExfQ.DVh-c1WN1SHnZcDLy9z_TiRJAMbMhoAJZZzIhf1X20k";

const { User } = require("../models");

const username = "test";
const email = "test@gmail.com";
const password = "testtest";
const role = "admin";
const name = "test";
const photo = "https://cdn.onlinewebfonts.com/svg/img_181369.png";
const phone = "1234567";
const address = "test";

// afterAll(async () => {
//   await User.destroy({
//     truncate: true,
//     cascade: true,
//     restartIdentity: true,
//   });
// });
describe("POST /register", () => {
  test("Success Register User", async () => {
    const response = await request(app).post("/register").send({
      username,
      email,
      password,
      role,
      name,
      photo,
      phone,
      address,
    });

    expect(response.status).toBe(201);
    expect(response.body.id).toEqual(expect.any(Number));
    expect(response.body.username).toBe(username);
    expect(response.body.email).toBe(email);
    expect(response.body.role).toBe(role);
    expect(response.body.name).toBe(name);
    expect(response.body.photo).toBe(photo);
    expect(response.body.phone).toBe(phone);
    expect(response.body.address).toBe(address);
  });

  test("400 failed register password to short", (done) => {
    request(app)
      .post("/register")
      .send({
        email: "test5@mail.com",
        password: "abc",
        role: "student",
        name: "leo",
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(400);
        expect(body).toHaveProperty("message");
        expect(
          body.message.includes(
            "Password length must be more than 5 characters"
          )
        ).toBeTruthy();

        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("POST /login", () => {
  test("200 success login", (done) => {
    request(app)
      .post("/login")
      .send({
        email,
        password,
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(body).toHaveProperty("access_token");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("401 failed login ", (done) => {
    request(app)
      .post("/login")
      .send({
        email,
        password: "wrongpassword",
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "Invalid email/password");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("GET /users", () => {
  test("200 success get users", (done) => {
    request(app)
      .get("/users")
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

  test("200 success get users by query", (done) => {
    request(app)
      .get("/users?email=mason@mail.com")
      .set({
        access_token: token,
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(body).toHaveProperty("result");
        expect(Array.isArray(body.result)).toBeTruthy();
        expect(body.result[0]).toHaveProperty("name", "Mason");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("401 [failed] get users without token", (done) => {
    request(app)
      .get("/users")
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "jwt must be provided");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("GET /users/:id", () => {
  test("200 success get user by id", (done) => {
    request(app)
      .get("/users/1")
      .set({
        access_token: token,
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(body).toHaveProperty("name", "Mason");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("404 failed get user by id", (done) => {
    request(app)
      .get("/users/99")
      .set({
        access_token: token,
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(404);
        expect(body).toHaveProperty("message", "User with ID 99 not found");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("update /users/:id", () => {
  test("200 success update users", (done) => {
    request(app)
      .put("/users/4")
      .set({
        access_token: token,
      })
      .send({
        name: "test new name",
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(body).toHaveProperty(
          "message",
          "User with id 4 has been updated"
        );
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("404 failed update user", (done) => {
    request(app)
      .put("/users/99")
      .set({
        access_token: token,
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(404);
        expect(body).toHaveProperty("message", "User with ID 99 not found");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("delete /users/:id", () => {
  test("200 success delete users", (done) => {
    request(app)
      .delete("/users/4")
      .set({
        access_token: token,
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        expect(body).toHaveProperty(
          "message",
          "User with id 4 has been deleted"
        );
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("404 failed delete user", (done) => {
    request(app)
      .delete("/users/99")
      .set({
        access_token: token,
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(404);
        expect(body).toHaveProperty("message", "User with ID 99 not found");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
