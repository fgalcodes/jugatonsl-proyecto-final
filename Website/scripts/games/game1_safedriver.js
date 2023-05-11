// Clase Enemigo
class Enemigo {
  // fotos = [truck, car2];
  // foto = this.fotos[Math.round(Math.random())];
  colores = ["red", "blue", "black"];
  color = this.colores[Math.round(Math.random() * 3)];

  constructor(x, y, ancho, alto, velocidad) {
    this.x = x;
    this.y = y;
    this.ancho = ancho;
    this.alto = alto;
    this.velocidad = velocidad;
  }

  // Mover los enemigos en el eje y hasta que lleguen al final
  mover() {
    this.x -= this.velocidad;

    // si llegan al final vuelven a aparecer arriba
    if (this.x < 0) {
      this.x = htmlCanvas.width;
      this.y = Math.random() * (htmlCanvas.height - this.alto);
      this.color = this.colores[Math.round(Math.random() * 3)];
      score = score + 10;
    }
  }

  dibujar() {
    inGameCanvas.fillStyle = this.color;
    inGameCanvas.fillRect(this.x, this.y, this.ancho, this.alto);
    //   inGameCanvas.drawImage(this.foto, this.x, this.y, this.ancho, this.alto);
  }
}

// Variables principales
let htmlCanvas = document.getElementById("game");
let inGameCanvas = htmlCanvas.getContext("2d");

//   let truck = new Image();
//   truck.src = "src/truck.png";
//   let car = new Image();
//   car.src = "src/car.png";
//   let car2 = new Image();
//   car2.src = "src/car2.png";

let player = {
  x: 10,
  y: htmlCanvas.height / 2,
  ancho: 90,
  alto: 60,
  color: "green",
};
let coches = [];
let score = 0;
let gameover = false;

// Event listener para mover el jugador
htmlCanvas.addEventListener("mousemove", function (event) {
  let rect = htmlCanvas.getBoundingClientRect();
  player.y = event.clientY - rect.top - player.alto / 2;
});

// Función para comprobar colisiones entre dos objetos pasados
function colision(objeto1, objeto2) {
  return (
    objeto1.x < objeto2.x + objeto2.ancho &&
    objeto1.x + objeto1.ancho > objeto2.x &&
    objeto1.y < objeto2.y + objeto2.alto &&
    objeto1.y + objeto1.alto > objeto2.y
  );
}

// Función para mostrar la "pantalla" de jugar de nuevo
function mostrarGameover() {
  UpdateIntentos();
  let gameoverDiv = document.getElementById("gameover");
  let gameoverTitle = document.querySelector("#gameover h2");
  let gameoverBtn = document.getElementById("play-again");
  let scoreSpan = document.getElementById("score");
  if (score >= 500){
    gameoverTitle.innerText = "Puntos Superados!";
    gameoverBtn.setAttribute('onclick', 'nextLevel()');
    gameoverBtn.innerText = "Volver a niveles";
    UpdateProfile(score);
  }
  htmlCanvas.style.animation = "none";
  scoreSpan.textContent = score;
  gameoverDiv.style.display = "block";
  document.getElementById("game").style.filter = "brightness(50%)";
}

// Función para el botón de reiniciar el juego
function reiniciarJuego() {  
  gameover = false;
  score = 0;
  coches = [];
  player.x = 10;
  document.getElementById("gameover").style.display = "none";
  htmlCanvas.style.animation = "moveRoad 1s linear infinite";
  document.getElementById("game").style.filter = "brightness(100%)";
  crearCoches();
  loopJuego();
}

// Función para actualizar el juego
function actualizarJuego() {
  if (!gameover) {
    // Limpiar el canvas
    inGameCanvas.clearRect(0, 0, htmlCanvas.width, htmlCanvas.height);

    // Mover y dibujar los coches
    for (let i = 0; i < coches.length; i++) {
      coches[i].dibujar();
      coches[i].mover();
    }

    // Comprobar colisiones y finalizar juego si choca
    for (let i = 0; i < coches.length; i++) {
      if (colision(player, coches[i])) {
        gameover = true;
        mostrarGameover();
      }
    }

    // Dibujar al jugador
    inGameCanvas.fillStyle = player.color;
    inGameCanvas.fillRect(player.x, player.y, player.ancho, player.alto);
    //   inGameCanvas.drawImage(player.imagen, player.x, player.y, player.ancho, player.alto);

    // Mostrar la puntuación
    inGameCanvas.fillStyle = "black";
    inGameCanvas.font = "24px 'Nunito', sans serif";
    inGameCanvas.fillText("Puntuación: " + score, 10, 30);
  }
}

// Función para el bucle del juego
function loopJuego() {
  actualizarJuego();
  if (!gameover) {
    requestAnimationFrame(loopJuego);
  }
}

// Crear los coches enemigos
function crearCoches() {
  for (let i = 0; i < 5; i++) {
    let y = Math.random() * (htmlCanvas.height - 50);
    let x = htmlCanvas.width;
    let ancho = 140;
    let alto = 80;
    let velocidad = Math.random() * 5 + 1;
    coches.push(new Enemigo(x, y, ancho, alto, velocidad));
  }
}

// Al clicar el botón de jugar empieza el juego
function jugar() {
  document.getElementById("play").style.display = "none";
  htmlCanvas.style.animation = "moveRoad 1s linear infinite";
  crearCoches();
  loopJuego();
}
