const socket = io("http://localhost:3011");
const messageForm = document.getElementById("send-container");
const messageInput = document.getElementById("message-input");

socket.on("chat-message", (data) => {
  console.log(data);
});
//
messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  //emit send info from cliet to server
  //"send-chat-message"--event name
  socket.emit("send-chat-message", message);
  //empty out message after every sent
  messageInput.value = "";
});
