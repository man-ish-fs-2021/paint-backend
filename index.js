const cors = require("cors");
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, { cors: "http://localhost:3000/" });

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.use(cors({ origin: "http://localhost:3000/" }));
io.on("connection", (socket) => {
  console.log("server connected");
  socket.on("beginPath", (arg) => {
    socket.broadcast.emit("beginPath", arg);
  });
  socket.on("drawLine", (arg) => {
    socket.broadcast.emit("drawLine", arg);
  });
  socket.on("changeConfig", (arg) => {
    socket.broadcast.emit("changeConfig", arg);
  });
});

server.listen(5334, () => {
  console.log("listening on *:5334");
});
