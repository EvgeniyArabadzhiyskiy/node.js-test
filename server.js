const express = require("express");
const { connectionMongo } = require("./src/db/connections");
const { authRouter } = require("./src/routers/authRouter");
const { postRouter } = require("./src/routers/postRouter");
require("dotenv").config();

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(express.static("public"));
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);

app.use((req, response) => {
  response.send("ERROR");
});

app.use((err, req, res, next) => {
  // const { status = 500, message = "Server error" } = err;
  res.status(500).json({ message: err.message });
});

const start = async () => {
  await connectionMongo();

  // ========== server =================
  app.listen(PORT, (err) => {
    if (err) {
      console.error(err);
    }
    console.log(`Server run on port ${PORT}`);
  });
};

start();

// npx nodemon server.js
