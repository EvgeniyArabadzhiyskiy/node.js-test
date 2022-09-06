const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

app.use(express.static("public"));

io.on("connection", (socket) => {
  socket.on("MESSAGE_FROM_CLIEN", ({ message, userName }) => {
    io.emit("SERVER_MESSAGE_TO_ALL", `${userName}: ${message}`);
  });
});

server.listen(8085, () => {
  console.log("server run on PORT 8085");
});
