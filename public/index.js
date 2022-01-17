const socket = io();

const button = document.getElementById("send");

const sendMesaage = (e) => {
  e.preventDefault();
  const message = {
    nombre: document.getElementById("nombre").value,
    mensaje: document.getElementById("mensaje").value,
  };
  socket.emit("incomingMessage", message);
};

button.addEventListener("click", sendMesaage);

socket.on("chat", (messages) => {
  const texto = messages
    .map((mensaje) => {
      return `<li>${mensaje.nombre}: ${mensaje.mensaje}</li>`;
    })
    .join("");

  document.getElementById("messages").innerHTML = texto;
});

console.log("hola");
