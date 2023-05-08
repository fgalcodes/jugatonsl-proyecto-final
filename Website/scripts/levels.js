const usuario21 = "https://localhost:7041/api/Perfiles/21";

fetch(usuario21)
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
    if (data.nivel === 1) {
      console.log("Campeón has entrado al nivel 1");
      alert("Campeón has entrado al nivel 1");
    }
  })
  .catch((error) => {
    //handle error
    console.log(error);
  });
