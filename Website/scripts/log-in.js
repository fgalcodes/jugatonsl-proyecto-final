// Inicializar variables
let apiPerfil;
let succesful = false;
let usuarioId;
let usuariosLogin = [];

// Definir elementos del DOM
const login = document.getElementById("login");

const loginName = document.getElementById("user-name-login");
const loginPass = document.getElementById("user-password-login");
const loginBtn = document.getElementById("loginBtn");

// Peticion GET a la API de Usuarios, y persistencia en localStorage
function logindata() {
  fetch(apiUsuarios)
    .then((response) => {
      console.log(response);
      if (response.ok) {
        return response.json();
      }
    })
    .then((data) => {
      console.log(data);
      for (const usuario of data) {
        usuariosLogin.push(usuario);
      }

      RecogerIdUsuario(usuariosLogin);

      apiPerfil = "https://grupo1jugatonsl.azurewebsites.net/api/Perfiles/" + usuarioId;

      storageProfile();
      if(!(usuarioId == null)) {console.log("El id de usuario es: " + usuarioId);}
      

      popupBlock();
    })
    .catch((error) => {
      console.log(error);
    });
}

// Comprobar usuario existente y correcto
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
    loginPass.value = "";
  }
  
}

// Guardar perfil en localStorage
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
