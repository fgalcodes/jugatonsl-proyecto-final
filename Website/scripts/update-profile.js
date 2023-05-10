const apiUpdatePerfilesIntentos = "https://grupo1jugatonsl.azurewebsites.net/api/Perfiles";

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
      //handle response
      console.log(response);
      if (response.ok) {
        return response.json();
      }
    })
    .then((data) => {
      //handle data
      console.log(data);
    })
    .catch((error) => {
      //handle error
      console.log(error);
    });
}

function UpdateIntentos() {
  // profileUpdateIntentos.intentos = parseInt(profileUpdateIntentos.intentos) + 1;

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
      //handle response
      console.log(response);
      if (response.ok) {
        return response.json();
      }
    })
    .then((data) => {
      //handle data
      console.log(data);
    })
    .catch((error) => {
      //handle error
      console.log(error);
    });
}
