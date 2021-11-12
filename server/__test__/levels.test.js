const request = require("supertest");
const app = require("../app");

const { Level } = require("../models");

// Test Variables
const name1 = "easy"

afterAll(async () => {
  await Level.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});

describe("Testing Level entity's endpoints", () => {
  test("Success in adding a new Level", async () => {
    const response = await request(app).post("/levels").send({
      name: name1
    })

    expect(response.status).toBe(201)
    expect(response.message).toBe('Success add level')
  })
})