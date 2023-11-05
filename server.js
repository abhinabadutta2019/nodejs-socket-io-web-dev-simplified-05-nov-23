const io = require("socket.io")(3011, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  // socket.emit("chat-message", "Hello-world1");
  //
  socket.on("send-chat-message", (message) => {
    console.log(message);
    socket.broadcast.emit("chat-message", message);
    //this sends everone connected to the server, except who sends it
    // socket.broadcast.emit;
  });
});
//
