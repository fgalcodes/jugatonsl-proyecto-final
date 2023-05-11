// Declaracion API Perfiles
const apiUpdatePerfilesIntentos = "https://grupo1jugatonsl.azurewebsites.net/api/Perfiles";

// Declaracion variables localStorage
let acumuladorIntentos = parseInt(localStorage.getItem("intentos"));
let acumuladorNiveles = parseInt(localStorage.getItem("nivel"));
let acumuladorPuntos = parseInt(localStorage.getItem("puntuacion"));

let profileUpdate = {
  id_usuario: localStorage.getItem("idPerfil"),
  nombrePerfil: localStorage.getItem("nombrePerfil"),
  ubicacion: localStorage.getItem("ubicacion"),
  nivel: localStorage.getItem("nivel"),
  intentos: localStorage.getItem("intentos"),
  puntuacion: localStorage.getItem("puntuacion"),
};

// Actualizar Perfil, sumando Puntos, Intentos y Nivel mediante API
function UpdateProfile(score) {

  acumuladorNiveles++;
  localStorage.setItem("nivel", acumuladorNiveles);

  acumuladorPuntos = acumuladorPuntos + score;
  localStorage.setItem("puntuacion", acumuladorPuntos);

  profileUpdate.nivel = localStorage.getItem("nivel");
  profileUpdate.puntuacion = localStorage.getItem("puntuacion");

  console.log(profileUpdate);

  let putUpdateProfile = {
    method: "PUT",
    body: JSON.stringify(profileUpdate),
    headers: {
      "Content-Type": "application/json",
    },
  };

  fetch(apiUpdatePerfilesIntentos, putUpdateProfile).then((response) =>
    response.json()
  );

  fetch(apiUpdatePerfilesIntentos)
    .then((response) => {
      console.log(response);
      if (response.ok) {
        return response.json();
      }
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

// Actualizar Intentos mediante API
function UpdateIntentos() {

  acumuladorIntentos++;
  localStorage.setItem("intentos", acumuladorIntentos);

  profileUpdate.intentos = localStorage.getItem("intentos");
  console.log(profileUpdate);

  let putUpdateIntentos = {
    method: "PUT",
    body: JSON.stringify(profileUpdate),
    headers: {
      "Content-Type": "application/json",
    },
  };

  fetch(apiUpdatePerfilesIntentos, putUpdateIntentos).then((response) =>
    response.json()
  );

  fetch(apiUpdatePerfilesIntentos)
    .then((response) => {
      console.log(response);
      if (response.ok) {
        return response.json();
      }
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
}
