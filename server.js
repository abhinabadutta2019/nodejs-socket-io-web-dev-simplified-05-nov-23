const io = require("socket.io")(3011, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  socket.emit("chat-message", "Hello-world1");
});
//
