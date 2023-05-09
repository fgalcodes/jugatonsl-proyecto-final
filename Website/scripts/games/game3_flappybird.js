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

function drawBird() {
  ctx.fillStyle = "#F56565";
  ctx.fillRect(bird.x, bird.y, bird.width, bird.height);
}

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

function updateBird() {
  bird.velocity += bird.gravity;
  bird.y += bird.velocity;
}

function updatePipe() {
  pipe.x -= pipe.speed;

  if (pipe.x + pipe.width < 0) {
    pipe.x = canvas.width;
    score++;
    pipe.height = Math.round(Math.random() * (80 - 20) + 20);
  }

  // Collision detection
  if (
    bird.x < pipe.x + pipe.width &&
    bird.x + bird.width > pipe.x &&
    (bird.y < pipe.height || bird.y + bird.height > pipe.height + pipe.gap)
  ) {
    pipe.collision = true;
  }
}

function drawScore() {
  ctx.fillStyle = "#1A202C";
  ctx.font = "12px Arial";
  ctx.fillText(`Score: ${score}`, 10, 20);
}

function gameLoop() {
  if (!gameover) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawPipe();
    drawBird();
    drawScore();

    if (!pipe.collision) {
      updateBird();
      updatePipe();
      requestAnimationFrame(gameLoop);
    } else {
      gameOver();
    }
  }
}

function gameOver() {
  gameover = true;
  canvas.style.animation = "none";
  let gameoverDiv = document.getElementById("gameover");
  let scoreSpan = document.getElementById("score");
  scoreSpan.textContent = score;
  gameoverDiv.style.display = "block";
  canvas.style.filter = "invert(10%)";
}

function jump() {
  bird.velocity = bird.jump;
}

document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    jump();
  }
});

document.addEventListener("click", jump);

function jugar() {
  document.getElementById("play").style.display = "none";
  canvas.style.animation = "moveBg 3s linear infinite";
  gameLoop();
}

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
