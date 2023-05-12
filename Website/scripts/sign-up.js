// Deficionion APIs
const apiPerfiles = "https://grupo1jugatonsl.azurewebsites.net/api/Perfiles";
const apiUsuarios = "https://grupo1jugatonsl.azurewebsites.net/api/Usuarios";

// Definicion elementos DOM
const signup = document.getElementById("signup");
const signupBtn = document.getElementById("signupBtn");

let usuarios = [];

let tempId;

// Metodo GET API Usuario
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
      usuarios.push(usuario);
    }

    console.log(usuarios);

    tempId = usuarios[usuarios.length - 1].id;
    console.log(tempId);
  })
  .catch((error) => {
    console.log(error);
  });

let clickedReg = false;

// Al clickar registrar Usuario
signupBtn.addEventListener("click", (e) => {

  clickedReg = true;

  let user = {
    usuario: document.getElementById("user-name").value,
    password: document.getElementById("user-password").value,
  };

  let profile = {
    id_usuario: tempId + 1,
    nombrePerfil: document.getElementById("profile-name").value,
    ubicacion: document.getElementById("profile-location").value,
    nivel: 1,
  };
  
  if (CheckUserRegistered(user.usuario)) {
    console.log("Usuario ya registrado");
    return;
  }

  if(clickedReg) {
    signupBtn.style.pointerEvents = "none";
  }


  // Consumir API

  let post = {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  };

  let put = {
    method: "PUT",
    body: JSON.stringify(profile),
    headers: {
      "Content-Type": "application/json",
    },
  };

  console.log(user);
  console.log(profile);

  signInUser(post);
  signInProfile(put);

  succesful = true;

  setTimeout(function () {
    localStorage.clear();
    popupRegisterSuccesfull();
  }, 1900);
});

function popupRegisterSuccesfull() {
  document.getElementById("popup-block2").style.display = "block";
  document.querySelector("main").style.visibility = "hidden";
}

// PopUp mapa para registrar Ubicacion
function verMapa() {
  window.open("mapa.html", "_blank", "width=800,height=600");
}

// Recuperar localizacion usuario
document.body.addEventListener("mouseover", function () {
  document.getElementById("profile-location").value =
    localStorage.getItem("currentLoc");
});

// Registro Usuario
async function signInUser(post) {
  try {
    const res = await fetch(apiUsuarios, post);
    const data = await res.json();

    if (!res.ok) {
      console.log("uwu");
      return;
    }
    console.log(data);
    
  } catch (error) {
    console.log(error);
  }
}

// Creacion de Perfil
async function signInProfile(put) {
  try {
    const res = await fetch(apiPerfiles, put);
    const data = await res.json();

    if (!res.ok) {
      console.log("uwu");
      return;
    }
    console.log(data);
    
  } catch (error) {
    console.log(error);
  }
}


// Comprobación Usuario registrado
function CheckUserRegistered(user) {
  return usuarios.find(userTarget => userTarget.usuario === user) !== undefined;
}