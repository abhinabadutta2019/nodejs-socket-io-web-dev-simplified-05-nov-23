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

const PORT = 3013;

server.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
