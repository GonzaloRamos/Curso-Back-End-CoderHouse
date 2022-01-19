const socket = io();

const button = document.getElementById("buttonSend");

const sendMesaage = (e) => {
  e.preventDefault();
  const inputMsj = documen.getElementById("mensaje");
  const message = {
    email: document.getElementById("email").value,
    anio: new Date().getFullYear(),
    hora:
      new Date().getHours() +
      ":" +
      new Date().getMinutes() +
      ":" +
      new Date().getSeconds(),
    mensaje: inputMsj.value,
  };
  socket.emit("incomingMessage", message);
  inputMsj.value = "";
  inputMsj.focus();
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
      return `<li class="list-group-item mt-3"><span class="text-primary fw-bold">${mensaje.email}</span> <span class="text-success"> [${mensaje.anio} ${mensaje.hora}]</span>: ${mensaje.mensaje}</li>`;
    })
    .join("");

  document.getElementById("messages").innerHTML = texto;
});
