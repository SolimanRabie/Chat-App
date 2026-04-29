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

  socket.on("chat message", (message) => {
    console.log("message: ", message);

    io.emit("send_messages_to_all_users", message);
  });

  socket.on("typing", (user) => {
    socket.broadcast.emit("show_typing_status", user);
  });

  socket.on("stop-typing", () => {
    socket.broadcast.emit("clear_typing_status");
  });

  socket.on("stop-typing", () => {
    socket.broadcast.emit("clear_typing_status");
  });
});

server.listen(3000, () => {
  console.log("listening on http://localhost:3000 ");
});
