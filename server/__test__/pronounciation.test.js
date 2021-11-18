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

describe("Test AIPronouncation", () => {
  test("201 success create pronounciation", (done) => {
    request(app)
      .post("/scores/get-score")
      .attach("file", "__test__/file/sound.wav")

      .set({
        access_token: token,
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
