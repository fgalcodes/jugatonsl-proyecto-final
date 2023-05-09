const apiUpdatePerfilesIntentos = "https://localhost:7041/api/Perfiles";

let acumulador = parseInt(localStorage.getItem('intentos'));

let profileUpdateIntentos = {
    id_usuario: localStorage.getItem('idPerfil'),
    nombrePerfil: localStorage.getItem('nombrePerfil'),
    ubicacion: localStorage.getItem('ubicacion'),
    nivel: localStorage.getItem('nivel'),
    intentos: localStorage.getItem('intentos')
}


function UpdateProfile() {
    // profileUpdateIntentos.intentos = parseInt(profileUpdateIntentos.intentos) + 1;
    
    acumulador++;
    localStorage.setItem('intentos', acumulador);
    
    profileUpdateIntentos.intentos = localStorage.getItem('intentos');
    console.log(profileUpdateIntentos);
    
    let putUpdateIntentos = {
        method: "PUT",
        body: JSON.stringify(profileUpdateIntentos),
        headers: {
          "Content-Type": "application/json",
        },
      };
    
    fetch(apiUpdatePerfilesIntentos, putUpdateIntentos).then((response) => response.json());

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