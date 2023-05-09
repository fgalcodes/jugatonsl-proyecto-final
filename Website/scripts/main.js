let localUsername = localStorage.getItem("nombrePerfil");
let localNivel = localStorage.getItem("nivel");
let localPuntuacion = localStorage.getItem("puntuacion");
let localIntentos = localStorage.getItem("intentos");

const infoProfileLocal = [localUsername, localNivel, localPuntuacion, localIntentos];

// let header = document.querySelector(".mainHeader")

// let newDiv = document.createElement("div");

// let name = document.createElement("a");

// name.textContent = username;

// newDiv.appendChild(name);
// header.appendChild(newDiv);

let usuarioConectado = false;
if (localStorage.key("idPerfil")) {
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
    node.href = "http://127.0.0.1:5500/Website/pages/profile.html";
  }
}
