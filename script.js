const socket = io("http://localhost:3011");

//
const messageContainer = document.getElementById("message-container");
const messageForm = document.getElementById("send-container");
const messageInput = document.getElementById("message-input");

//
const takeName = prompt("what is your name?");
appendMessage("You joined");
//sends - to server that new- user joined-to server
socket.emit("new-user", takeName);

socket.on("chat-message", (data) => {
  console.log(data, "data");
  appendMessage(`${data.name}: ${data.message}`);
  // appendMessage(data);
});

//
socket.on("user-connected", (name) => {
  //   console.log(name, "name");
  appendMessage(`${name} connected`);
});
//
socket.on("user-disconnected", (name) => {
  //   console.log(name, "name");
  appendMessage(`${name} disconnected`);
});
// //
// client er message -- jeta form e likhche
messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;

  //
  appendMessage(`You: ${message}`);

  //"send-chat-message"--event name---user sending to server
  socket.emit("send-chat-message", message);
  //empty out message after every sent
  messageInput.value = "";
});

// client jei message pathacche-- seta frontend e dekhano
function appendMessage(message) {
  const messageElement = document.createElement("div"); // Create a new div for each message
  // messageElement.innerHTML = message.replace(/\n/g, "<br>"); // Use innerHTML and replace line breaks with <br>
  //
  messageElement.innerHTML = message;
  messageContainer.append(messageElement); // Append the message div to the container
}
