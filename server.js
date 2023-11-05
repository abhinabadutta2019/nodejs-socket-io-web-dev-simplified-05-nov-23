const io = require("socket.io")(3011, {
  cors: {
    origin: "*",
  },
});

const users = {};

io.on("connection", (socket) => {
  // socket.emit("chat-message", "Hello-world1");
  socket.on("new-user", (name) => {
    users[socket.id] = name;
    //
    socket.broadcast.emit("user-connected", name);
  });
  //
  socket.on("send-chat-message", (message) => {
    console.log(message, "message");
    socket.broadcast.emit("chat-message", {
      message: message,
      name: users[socket.id],
    });
    //this sends everone connected to the server, except who sends it
    // socket.broadcast.emit;
  });
  //disconnect
  socket.on("disconnect", () => {
    socket.broadcast.emit("user-disconnected", users[socket.id]);
    delete users[socket.id];
    //
    // socket.broadcast.emit("user-connected", name);
  });
  //
});
//
