let username = localStorage.getItem("nombrePerfil");
let nivel = localStorage.getItem("nivel");
let puntuacion = localStorage.getItem("puntuacion");
let intentos = localStorage.getItem("intentos");

const infoProfileLocal = [username, nivel, puntuacion, intentos];

// let header = document.querySelector(".mainHeader")

// let newDiv = document.createElement("div");

// let name = document.createElement("a");

// name.textContent = username;

// newDiv.appendChild(name);
// header.appendChild(newDiv);

console.log(username);

let usuarioConectado = false;
if (localStorage.getItem("idPerfil") != "") {
  usuarioConectado = true;
}

if (usuarioConectado) {
  verPerfil();
}

function verPerfil() {
  console.log("logueado");
  let accountlink = document.querySelectorAll(".navRight .lastlink");
  for (let node of accountlink) {
    node.innerText = "Ver Perfil";
    node.href = "/pages/profile.html";
  }
}
