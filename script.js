const socket = io("http://localhost:3011");
const messageContainer = document.getElementById("message-container");
const messageForm = document.getElementById("send-container");
const messageInput = document.getElementById("message-input");

//
const usedName = prompt("what is your name?");
appendMessage("You joined");
socket.emit("new-user", usedName);

socket.on("chat-message", (data) => {
  console.log(data, "data");
  //
  appendMessage(`${data.name}: ${data.message}`);
});

//
socket.on("user-connected", (name) => {
  //   console.log(name, "name");
  //
  appendMessage(`${name} connected`);
});
//
socket.on("user-disconnected", (name) => {
  //   console.log(name, "name");
  //
  appendMessage(`${name} disconnected`);
});
//
messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;

  //
  appendMessage(`You: ${message}`);
  //
  //emit send info from cliet to server
  //"send-chat-message"--event name
  socket.emit("send-chat-message", message);
  //empty out message after every sent
  messageInput.value = "";
});

//
function appendMessage(message) {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageContainer.append(message);
}
