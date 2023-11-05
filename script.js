const socket = io("http://localhost:3011");

socket.on("chat-message", (data) => {
  console.log(data);
});
