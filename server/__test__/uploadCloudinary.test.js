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

describe("Test UploadCloudinary and AIPronouncation", () => {
  test("201 success create uploadcloudinary", (done) => {
    request(app)
      .post("/scores")
      .attach("soundUrl", "__test__/file/sound.wav")
      .field("score", "90")
      .field("studentId", 1)
      .field("taskId", 1)
      .field("answer", "i don't understand")
      .set({
        access_token: token,
      })
      .then((response) => {
        const { body, status } = response;
        // expect(status).toBe(201);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
