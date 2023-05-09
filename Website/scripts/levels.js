let nivel = localStorage.getItem("nivel");

if (nivel == 1) {
  console.log("Campeón has entrado al nivel 1");
  alert("Campeón has entrado al nivel 1");
} else {
  console.log("Campeón no tienes el nivel para jugar");
  alert("Campeón no tienes el nivel para jugar");

  history.back();
}

// fetch(usuario21)
//   .then((response) => {
//     //handle response
//     console.log(response);
//     if (response.ok) {
//       return response.json();
//     }
//   })
//   .then((data) => {
//     //handle data
//     console.log(data);
//     if (data.nivel === 1) {
//       console.log("Campeón has entrado al nivel 1");
//       alert("Campeón has entrado al nivel 1");
//     } else {
//       console.log("Campeón no tienes el nivel para jugar");
//       alert("Campeón no tienes el nivel para jugar");

//       history.back();
//     }
//   })
//   .catch((error) => {
//     //handle error
//     console.log(error);
//   });
