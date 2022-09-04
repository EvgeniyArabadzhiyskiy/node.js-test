// const express = require("express");
// const request = require("supertest");

// const { getPostController } = require("../src/controllers/postControllers");

// const posts = [{ topic: "top", text: "text" }];

// const getPostController = async (req, res) => {
//    res.json({ posts, status: "success" });
// };

// const app = express();

// app.get("/api/posts", getPostController);

// describe("test getPostController", () => {
//   test("test getPostController", async () => {
//     const response = await request(app).get("/api/posts");
//     console.log("test ~ response", response.body);
//   });
// });

// let server;

// beforeAll(() => {
//   server = app.listen(8085);
// });

// afterAll(() => {
//   server.close();
// });

const request = require("supertest");
const express = require("express");

const app = express();

app.get("/user", function (req, res) {
  res.status(200).json({ name: "john" });
});

request(app)
  .get("/user")
  .expect("Content-Type", /json/)
  .expect("Content-Length", "15")
  .expect(200)
  .end(function (err, res) {
    if (err) throw err;
  });

describe("GET /user", function () {
  it("responds with json", function (done) {
    request(app)
      .get("/user")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});
