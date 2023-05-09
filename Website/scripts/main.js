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
  document.getElementById("verPerfilLink").style.display = "block";
  document.getElementById("logOutButton").style.display = "block";
  document.getElementById("loginButton").style.display = "none";
}

// function verPerfil() {
//   console.log("logueado");
//   let accountlink = document.querySelectorAll(".navRight .lastlink");
//   for (let node of accountlink) {
//     node.innerText = "Ver Perfil";
//     node.href = "127.0.0.1/pages/profile.html";
//   }
// }

function logout(){
  document.getElementById("verPerfilLink").style.display = "none";
  document.getElementById("logOutButton").style.display = "none";
  localStorage.clear();
  location.reload();
}