// let usuarioConectado = false;
// if (localStorage.getItem("idPerfil") != null){
//     usuarioConectado = true;
// }

// if (usuarioConectado){
//     verPerfil();
// }

verPerfil();

function verPerfil(){
    console.log("logueado");
    let accountlink = document.querySelectorAll(".navRight .lastlink");
    for (let node of accountlink) {
        node.innerText = "Ver Perfil"
        node.href = "pages/profile.html";
    }
}