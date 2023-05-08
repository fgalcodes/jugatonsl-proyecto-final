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

function draw() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the dino
  ctx.fillStyle = "green";
  ctx.fillRect(dinoX, dinoY, 10, 20);

  // Draw the enemy
  ctx.fillStyle = "red";
  ctx.fillRect(enemyX, enemyY, 10, 20);

  // Draw the score
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

function moveEnemy() {
  enemyX -= 3;
  if (enemyX < -50) {
    enemyX = canvas.width;
    enemyY = canvas.height - 46;
    score++;
  }
}

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

function gameOver() {
  gameover = true;
  canvas.style.animation = "none";
  let gameoverDiv = document.getElementById("gameover");
  let scoreSpan = document.getElementById("score");
  scoreSpan.textContent = score;
  gameoverDiv.style.display = "block";
  document.getElementById("game").style.filter = "invert(10%)";
}

// Set up key listeners for jumping
document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    jump();
  }
});

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
  canvas.style.animation = "moveRoad 3s linear infinite";
  document.getElementById("game").style.filter = "invert(0)";
  bucleJuego();
}

// Start the game loop
function bucleJuego() {
  setInterval(() => {
    if (!gameover) {
      draw();
      update();
    }
  }, 1000 / 60);
}

function jugar() {
  document.getElementById("play").style.display = "none";
  canvas.style.animation = "moveRoad 3s linear infinite";
  bucleJuego();
}
