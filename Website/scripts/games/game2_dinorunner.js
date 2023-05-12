// Inicializar variables
const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");
let gameover = false;

let isJumping = false;
let jumpTimer = 0;
let jumpHeight = 30;
let dinoX = 10;
let dinoY = canvas.height - 46;
let enemyX = canvas.width - 50;
let enemyY = canvas.height - 46;
let score = 0;
let velocidad = 3;

// Dibujar jugador y enemigos
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "green";
  ctx.fillRect(dinoX, dinoY, 10, 20);

  ctx.fillStyle = "red";
  ctx.fillRect(enemyX, enemyY, 10, 20);

  ctx.fillStyle = "white";
  ctx.font = "12px Arial";
  ctx.fillText("Score: " + score, 5, 15);
}

function jump() {
  if (!isJumping) {
    isJumping = true;
    jumpTimer = 0;
  }
}

// Cambia los valores para el movimiento
function moveEnemy() {
  enemyX -= velocidad;
  if (enemyX < -50) {
    velocidad = Math.round(Math.random() * (6 - 2) + 2);
    enemyX = canvas.width;
    enemyY = canvas.height - 46;
    score += 20;
  }
}

// Si colisiona lleva a gameover
function checkCollision() {
  const dinoRight = dinoX + 10;
  const dinoBottom = dinoY + 20;
  const enemyRight = enemyX + 10;
  const enemyBottom = enemyY + 20;

  if (
    dinoRight > enemyX &&
    dinoX < enemyRight &&
    dinoBottom > enemyY &&
    dinoY < enemyBottom
  ) {
    // Collision detected!
    gameOver();
  }
}

// Va moviendo al enemigo hasta la izquierda
function update() {
  moveEnemy();
  checkCollision();
  
  // Handle jumping
  if (isJumping) {
    jumpTimer++;
    dinoY -= jumpHeight / 10;
  }
  if (jumpTimer > 20 && dinoY < canvas.height - 46) {
    dinoY += jumpHeight / 10;
    isJumping = false;
  }
}

// Suma un intento y comprueba si ha superado el mínimo de puntos
function gameOver() {
  UpdateIntentos();
  let gameoverDiv = document.getElementById("gameover");
  let gameoverTitle = document.querySelector("#gameover h2");
  let gameoverBtn = document.getElementById("play-again");
  let scoreSpan = document.getElementById("score");
  if (score >= 500){
    gameoverTitle.innerText = "Puntos Superados!";
    gameoverBtn.setAttribute('onclick', 'nextLevel()');
    gameoverBtn.innerText = "Volver a niveles";

    // Actualiza el perfil
    UpdateProfile(score);
  }
  gameover = true;
  canvas.style.animation = "none";
  scoreSpan.textContent = score;
  gameoverDiv.style.display = "block";
  canvas.style.filter = "invert(10%)";
}

// Saltar con tecla espacio listener
document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    jump();
  }
});

// Si ha perdido reinicia, si no irá a los demás niveles
function reiniciarJuego() {
  score = 0;
  isJumping = false;
  jumpTimer = 0;
  jumpHeight = 30;
  dinoX = 10;
  dinoY = canvas.height - 46;
  enemyX = canvas.width - 50;
  enemyY = canvas.height - 46;
  gameover = false;
  document.getElementById("gameover").style.display = "none";
  canvas.style.animation = "moveBg 3s linear infinite";
  canvas.style.filter = "invert(0)";
}

// Bucle del juego - canva
function bucleJuego() {
  setInterval(() => {
    if (!gameover) {
      draw();
      update();
    }
  }, 1000 / 60);
}

// Empieza el juego al clicar iniciar
function jugar() {
  document.getElementById("play").style.display = "none";
  canvas.style.animation = "moveBg 3s linear infinite";
  bucleJuego();
}
