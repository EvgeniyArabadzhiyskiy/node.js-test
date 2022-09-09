const express = require("express");
const cors = require("cors");
const { connectionMongo } = require("./src/db/connections");
const { authRouter } = require("./src/routers/authRouter");
const { postRouter } = require("./src/routers/postRouter");
const { filesRouter } = require("./src/routers/filesRouter");
require("dotenv").config();

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cors())
app.use(express.static("public"));
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/files", filesRouter);

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



