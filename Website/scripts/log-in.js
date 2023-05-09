// let apiUsuariosLogin = "https://localhost:7041/api/Usuarios";
let apiPerfil;

let usuarioId;
let usuariosLogin = [];

const login = document.getElementById("login");

const loginName = document.getElementById("user-name-login");
const loginPass = document.getElementById("user-password-login");
const loginBtn = document.getElementById("loginBtn");



loginBtn.addEventListener("click", (e) => {
    
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
          RecogerIdUsuario(usuariosLogin);
          apiPerfil = "https://localhost:7041/api/Perfiles/"+usuarioId;
          storageProfile();
          console.log("El id de usuario es: " + usuarioId);
        })
        .catch((error) => {
          //handle error
          console.log(error);
        });



});


function RecogerIdUsuario(usuariosLogin){
    let succesful = false;
    for (const usuario of usuariosLogin) {
        if (usuario.usuario === loginName.value && usuario.password === loginPass.value) {
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
    }
}


function storageProfile(){
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
    })
        
}