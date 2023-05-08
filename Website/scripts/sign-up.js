const apiPerfiles = "https://localhost:7041/api/Perfiles";
const apiUsuarios = "https://localhost:7041/api/Usuarios";

const signup = document.getElementById("signup");
const signupBtn = document.getElementById("signupBtn");

let usuarios = [];

// let profile;
let tempId;

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
    usuarios.push(usuario);
  }

  tempId = usuarios.pop().id;
  console.log(tempId);

})
.catch((error) => {
  //handle error
  console.log(error);
});

signupBtn.addEventListener("click", (e) => {

  let user = {
    usuario: document.getElementById("user-name").value,
    password: document.getElementById("user-password").value
  };

  let profile = {
    id_usuario: tempId + 1,
    nombrePerfil: document.getElementById("profile-name").value,
    ubicacion: document.getElementById("profile-location").value,
    nivel: 1
  };

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

  fetch(apiUsuarios, post).then((response) => response.json());
  fetch(apiPerfiles, put).then((response) => response.json());
});

// fetch(apiUsuarios)
//     .then((response) => {
//       //handle response
//       console.log(response);
//       if (response.ok) {
//         return response.json();
//       }
//     })
//     .then((data) => {
//       //handle data
//       console.log(data);
//     })
//     .catch((error) => {
//       //handle error
//       console.log(error);
//     });