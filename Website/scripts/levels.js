let nivel = localStorage.getItem("nivel");

let gameid = document.getElementById("game-id").textContent


switch(gameid)
{
  case "1":
    if (nivel == 1) {
      console.log("Campeón has entrado al nivel 1");
      alert("Campeón has entrado al nivel 1");
    } else {
      console.log("Campeón no tienes el nivel para jugar");
      alert("Campeón no tienes el nivel para jugar");
    
      history.back();
    }
    break;
  case "2":
    if (nivel == 2) {
      console.log("Campeón has entrado al nivel 2");
      alert("Campeón has entrado al nivel 2");
    } else {
      console.log("Campeón no tienes el nivel para jugar");
      alert("Campeón no tienes el nivel para jugar");
    
      history.back();
    }
    break;
  case "3":
    if (nivel == 3) {
      console.log("Campeón has entrado al nivel 3");
      alert("Campeón has entrado al nivel 3");
    } else {
      console.log("Campeón no tienes el nivel para jugar");
      alert("Campeón no tienes el nivel para jugar");
    
      history.back();
    }
    break;
}