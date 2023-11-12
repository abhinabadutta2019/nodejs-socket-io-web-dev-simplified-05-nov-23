import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

//
const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3049",
    methods: ["GET,HEAD,PUT,PATCH,POST,DELETE"],
  },
});
//
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);
  //
  socket.on("join_room", (data) => {
    //
    const { room, userName } = data;
    socket.join(room);
    //
    // socket.join(data);
    console.log(`${userName} joined room ${room}`);
  });
  //
  socket.on("send_message", (data) => {
    //
    const { message, room, userName } = data;
    // socket.to(data.room).emit("recived_message", data);
    socket.to(room).emit("recived_message", { message, userName, room });
    console.log(`${userName} sent a message to room ${room}: ${message}`);

    // console.log(data, "-send_message--data");
    // console.log(data.room);

    //
    // socket.emit("recived_message", data);
  });
});

//

const PORT = 3014;

server.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
