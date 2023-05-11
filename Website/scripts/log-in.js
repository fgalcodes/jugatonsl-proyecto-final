// let apiUsuariosLogin = "https://localhost:7041/api/Usuarios";
let apiPerfil;
let succesful = false;
let usuarioId;
let usuariosLogin = [];

const login = document.getElementById("login");

const loginName = document.getElementById("user-name-login");
const loginPass = document.getElementById("user-password-login");
const loginBtn = document.getElementById("loginBtn");

function logindata() {
  fetch(apiUsuarios)
    .then((response) => {
      //handle response
      console.log(response);
      if (response.ok) {
        return response.json();
      }
    })
    .then((data) => {
      //handle data
      console.log(data);
      for (const usuario of data) {
        usuariosLogin.push(usuario);
      }
      /*let correctCredentials =*/ RecogerIdUsuario(usuariosLogin);
      apiPerfil = "https://grupo1jugatonsl.azurewebsites.net/api/Perfiles/" + usuarioId;
      /*if (correctCredentials)*/ storageProfile();
      console.log("El id de usuario es: " + usuarioId);
      popupBlock();
    })
    .catch((error) => {
      //handle error
      console.log(error);
    });
}


function RecogerIdUsuario(usuariosLogin) {
  for (const usuario of usuariosLogin) {
    if (
      usuario.usuario === loginName.value &&
      usuario.password === loginPass.value
    ) {
      console.log(usuario);
      console.log("Hola campeon");
      succesful = true;
      usuarioId = usuario.id;
      break;
    }
  }

  if (!succesful) {
    console.log("Usuario o contraseña incorrectos");
    // loginName.value = "";
    loginPass.value = "";
    // return false;
  }
  // else return true;
  
}

function storageProfile() {
  fetch(apiPerfil)
    .then((response) => {
      //handle response
      console.log(response);
      if (response.ok) {
        return response.json();
      }
    })
    .then((data) => {
      localStorage.setItem("idPerfil", data.id_usuario);
      localStorage.setItem("nombrePerfil", data.nombrePerfil);
      localStorage.setItem("ubicacion", data.ubicacion);
      localStorage.setItem("puntuacion", data.puntuacion);
      localStorage.setItem("intentos", data.intentos);
      localStorage.setItem("nivel", data.nivel);
    });
}

function popupBlock() {
  if (succesful) {
    document.getElementById("popup-block").style.display = "block";
    document.querySelector("main").style.visibility = "hidden";
  }
}
