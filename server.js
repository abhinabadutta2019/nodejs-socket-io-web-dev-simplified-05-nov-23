const io = require("socket.io")(3011, {
  cors: {
    // origin: "*",
    origin: ["http://127.0.0.1:5500"],
  },
});

const users = {};
//aaa

io.on("connection", (socket) => {
  socket.emit("chat-message", "Hello-world-folks");
  console.log("new User");

  //server -recives - from client that new- user joined-to server
  socket.on("new-user", (name) => {
    users[socket.id] = name;

    console.log(users, "users---");
    //
    socket.broadcast.emit("user-connected", name);
  });
  // //
  // send by server recved by the client
  socket.on("send-chat-message", (message) => {
    // console.log(message, "--message");
    //this send from one client --- and his messege would be send to all other clients, except him
    // socket.broadcast.emit("chat-message", message);
    //
    socket.broadcast.emit("chat-message", {
      message: message,
      name: users[socket.id],
    });
    //
    //
  });
  //disconnect
  socket.on("disconnect", () => {
    socket.broadcast.emit("user-disconnected", users[socket.id]);
    delete users[socket.id];
  });
  //
});
//
