let username = localStorage.getItem("nombrePerfil");
let nivel = localStorage.getItem("nivel");
let puntuacion = localStorage.getItem("puntuacion");

let header = document.querySelector(".mainHeader")

let newDiv = document.createElement("div");

let name = document.createElement("a");

name.textContent = username;

newDiv.appendChild(name);
header.appendChild(newDiv);




console.log(username);