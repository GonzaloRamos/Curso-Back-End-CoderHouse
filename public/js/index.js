const socket = io();

const button = document.getElementById("buttonSend");

const sendMesaage = (e) => {
  e.preventDefault();
  const message = {
    nombre: document.getElementById("nombre").value,
    mensaje: document.getElementById("mensaje").value,
  };
  socket.emit("incomingMessage", message);
};

button.addEventListener("click", sendMesaage);

socket.on("onLoad", (productos) => {
  fetch("http://localhost:3000/template/productos.tpl")
    .then((res) => res.text())
    .then((data) => {
      const template = Handlebars.compile(data);
      const html = template({ productos });
      document.getElementById("dataProductos").innerHTML = html;
    });
});

socket.on("chat", (messages) => {
  const texto = messages
    .map((mensaje) => {
      return `<li>${mensaje.nombre}: ${mensaje.mensaje}</li>`;
    })
    .join("");

  document.getElementById("messages").innerHTML = texto;
});
