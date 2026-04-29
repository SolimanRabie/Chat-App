const express = require("express");
const app = express();
const { join } = require("path");
const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer(app);

const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

io.on("connection", (socket) => {
  console.log("a user connected with socket id : ", socket.id);

  socket.on("chat message", (msg) => {
    console.log("message: " + msg);

    io.emit("send_messages_to_all_users", msg);
  });
  socket.on("typing", () => {
    socket.broadcast.emit("show_typing_status");
  });
});

server.listen(3000, () => {
  console.log("listening on http://localhost:3000 ");
});
