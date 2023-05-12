// Inicializar variables
const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");
let gameover = false;

const bird = {
  x: 50,
  y: canvas.height / 2,
  width: 15,
  height: 15,
  velocity: 0,
  gravity: 0.4,
  jump: -7,
};

const pipe = {
  x: canvas.width,
  width: 20,
  height: 50,
  gap: 70,
  speed: 3,
  collision: false,
};

let score = 0;

// Dibuja al jugador
function drawBird() {
  ctx.fillStyle = "#F56565";
  ctx.fillRect(bird.x, bird.y, bird.width, bird.height);
}

// Dibuja las tuberias
function drawPipe() {
  ctx.fillStyle = "#1A202C";
  ctx.fillRect(pipe.x, 0, pipe.width, pipe.height);
  ctx.fillRect(
    pipe.x,
    pipe.height + pipe.gap,
    pipe.width,
    canvas.height - pipe.height - pipe.gap
  );
}

// Cambia valores del jugador
function updateBird() {
  bird.velocity += bird.gravity;
  bird.y += bird.velocity;
}

// Cambia valores de las tuberias
function updatePipe() {
  pipe.x -= pipe.speed;

  if (pipe.x + pipe.width < 0) {
    pipe.x = canvas.width;
    score += 50;
    pipe.height = Math.round(Math.random() * (80 - 20) + 20);
  }

  // Comprueba colisión y cambia el valor
  if (
    bird.x < pipe.x + pipe.width &&
    bird.x + bird.width > pipe.x &&
    (bird.y < pipe.height || bird.y + bird.height > pipe.height + pipe.gap)
  ) {
    pipe.collision = true;
  }
}

// Mostrar puntos que va ganando
function drawScore() {
  ctx.fillStyle = "#1A202C";
  ctx.font = "12px Arial";
  ctx.fillText(`Score: ${score}`, 10, 20);
}

// Bucle del juego - canvas
function gameLoop() {
  if (!gameover) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawPipe();
    drawBird();
    drawScore();

    // Si colisiona llama a gameOver
    if (!pipe.collision) {
      updateBird();
      updatePipe();
      requestAnimationFrame(gameLoop);
    } else {
      gameOver();
    }
  }
}

// Suma un intento y comprueba si ha superado el mínimo de puntos
function gameOver() {
  UpdateIntentos();
  gameover = true;
  let gameoverDiv = document.getElementById("gameover");
  let gameoverTitle = document.querySelector("#gameover h2");
  let gameoverBtn = document.getElementById("play-again");
  let scoreSpan = document.getElementById("score");
  if (score >= 1000){
    gameoverTitle.innerText = "Puntos Superados!";
    gameoverBtn.setAttribute('onclick', 'nextLevel()');
    gameoverBtn.innerText = "Volver a niveles";

    // Actualiza el perfil
    UpdateProfile(score);
  }
  canvas.style.animation = "none";
  scoreSpan.textContent = score;
  gameoverDiv.style.display = "block";
  canvas.style.filter = "invert(10%)";
}

function jump() {
  bird.velocity = bird.jump;
}

// Saltar con tecla espacio listener
document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    jump();
  }
});

document.addEventListener("click", jump);

// Si ha perdido reinicia, si no irá a los demás niveles
function reiniciarJuego() {
  gameover = false;
  score = 0;
  bird.x = 50;
  bird.y = canvas.height / 2;
  pipe.collision = false;
  pipe.x = canvas.width;
  document.getElementById("gameover").style.display = "none";
  canvas.style.animation = "moveBg 3s linear infinite";
  canvas.style.filter = "invert(0)";
  gameLoop();
}

// Empieza el juego al clicar iniciar
function jugar() {
  document.getElementById("play").style.display = "none";
  canvas.style.animation = "moveBg 3s linear infinite";
  gameLoop();
}
