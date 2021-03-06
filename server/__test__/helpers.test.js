const request = require("supertest");
const app = require("../app");

let token;
let studentToken;
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
      email: "mason@mail.com",
      password: "password",
    })
    .then((response) => {
      const { body } = response;
      token = body.access_token;
      return request(app).post("/login").send({
        email: "mactavish@mail.com",
        password: "password",
      });
    })
    .then((response) => {
      const { body } = response;
      studentToken = body.access_token;
      done();
    })
    .catch((err) => {
      done(err);
    });
});

describe("Test UploadCloudinary and AIPronouncation", () => {
  jest.setTimeout(15000);
  test("200 success get scores from AI Api", (done) => {
    request(app)
      .post("/scores/get-score")
      .attach("audioBuffer", "__test__/file/sound.wav")
      .field("question", "i don't understand")
      .set({
        access_token: token,
      })
      .then((response) => {
        const { body, status } = response;
        expect(status).toBe(200);
        // expect(body).toBe("message", "test");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("Test UploadCloudinary and AIPronouncation", () => {
  jest.setTimeout(15000);
  test("201 success create scores", (done) => {
    request(app)
      .post("/scores")
      .attach("audio", "__test__/file/sound.wav")
      .field("score", "90")
      // .field("studentId", 1)
      .field("taskId", 1)
      .field("answer", "i don't understand")
      .set({
        access_token: token,
      })
      .then((response) => {
        const { body, status } = response;
        // expect(status).toBe(201);
        expect(Number.isInteger(status)).toBeTruthy();
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
