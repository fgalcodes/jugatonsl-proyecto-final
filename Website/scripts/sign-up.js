const apiPerfiles = "https://localhost:7041/api/Perfiles";
const apiUsuarios = "https://localhost:7041/api/Usuarios";

const signup = document.getElementById("signup");
const signupBtn = document.getElementById("signupBtn");

let usuarios = [];

// let user;
// let profile;

signupBtn.addEventListener("click", (e) => {
  let user = {
    usuario: document.getElementById("user-name").value,
    password: document.getElementById("user-password").value,
  };

  let profile = {
    id: 0,
    nombre: document.getElementById("profile-name").value,
    ubicacion: document.getElementById("profile-location").value,
  };

  console.log(user);
  console.log(profile);

  let post = {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  };

  let put = {
    method: 'PUT',
    body: JSON.stringify(profile),
    headers:{
      'Content-Type':'application/json'
    }
  }

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

      let newUser = usuarios.pop();
      profile.id = newUser.id;
      console.log(profile);

      usuarios = [];

    })
    .catch((error) => {
      //handle error
      console.log(error);
    });

    
      fetch(apiUsuarios, post).then((response) => response.json());
    //   fetch(apiPerfiles, put).then((response) => response.json());
});

