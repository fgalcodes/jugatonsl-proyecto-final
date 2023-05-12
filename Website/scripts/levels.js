// Comprobación de niveles
if (!(localStorage.key("idPerfil"))) {
  alert("Necesitas loguearte para jugar");
  location.href = "log-sign-in.html";
}

let nivel = localStorage.getItem("nivel");
let gameid = document.getElementById("game-id").textContent;

if(nivel == gameid)
{
  console.log("Campeón has entrado al nivel " + gameid);
    alert("Campeón has entrado al nivel " + gameid);
}
else
{
  console.log("Campeón no tienes el nivel para jugar");
  alert("Campeón no tienes el nivel para jugar");
  history.back();
}
