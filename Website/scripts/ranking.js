const url = "https://localhost:7041/api/Perfiles";
const tableSelector = document.getElementById("table-ranking");
const records = document.getElementById("records-perfiles");

let perfiles = [];
let posicion = 1;

fetch(url)
.then(response => {
  //handle response            
  console.log(response);
  if (response.ok) {
      return response.json();
  }
})
.then(data => {
  //handle data
  console.log(data);
  
  for (const perfil of data) {
    perfiles.push(perfil);
  }
  
  OrdenarPerfiles(perfiles, records);
  CrearPerfiles(perfiles, records);
  
})
.catch(error => {
  //handle error
  console.log(error);
});

function OrdenarPerfiles(perfiles, records) {
    perfiles.sort(function(a, b) {
        return b.puntuacion - a.puntuacion;
    });
    return perfiles;   
}

function CrearPerfiles(perfiles, records) {
    for (const perfil of perfiles) {
        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        let td4 = document.createElement("td");
        let td5 = document.createElement("td");

        td1.setAttribute("class", "position");
        td2.setAttribute("class", "name");
        td3.setAttribute("class", "country");
        td4.setAttribute("class", "score");
        td5.setAttribute("class", "attemps");

        td1.textContent = posicion;
        td2.textContent = perfil.nombrePerfil;
        td3.textContent = perfil.ubicacion;
        td4.textContent = perfil.puntuacion;
        td5.textContent = perfil.intentos;
        
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);

        records.appendChild(tr);
        posicion++;
    }
}

