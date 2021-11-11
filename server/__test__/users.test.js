const request = require("supertest");
const app = require("../app");

const { User } = require("../models");

const username = "test";
const email = "test@gmail.com";
const password = "testtest";
const role = "admin";
const name = "test";
const photo = "https://cdn.onlinewebfonts.com/svg/img_181369.png";
const phone = "1234567";
const address = "test";

afterAll(async () => {
  await User.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});
describe("users test", () => {
  test("Success Register User", async () => {
    const response = await request(app).post("/users/register").send({
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
});
