// function Dino() {
//   this.x = 50;
//   this.y = 0;
//   this.width = 50;
//   this.height = 50;
//   this.jump = function () {
//     // Add code to make the dino jump
//   };
//   this.move = function () {
//     // Add code to move the dino forward
//   };
// }

// function Enemigo() {
//   this.x = 500;
//   this.y = 0;
//   this.width = 50;
//   this.height = 50;
//   this.move = function () {
//     // Add code to move the enemigo backward
//   };
// }

// var enemigos = [];

// function addEnemigo() {
//   // Add code to randomize the position of the enemigo
//   var enemigo = new Enemigo();
//   enemigos.push(enemigo);
// }

// function moveEnemigos() {
//   for (var i = 0; i < enemigos.length; i++) {
//     enemigos[i].move();
//   }
// }

// function gameLoop() {
//   // Add code to move the dino forward and check for collisions
//   if (Math.random() < 0.01) {
//     addEnemigo();
//   }
//   moveEnemigos();
//   requestAnimationFrame(gameLoop);
// }

// gameLoop();

// function checkCollisions() {
//   for (var i = 0; i < enemigos.length; i++) {
//     var enemigo = enemigos[i];
//     if (
//       dino.x < enemigo.x + enemigo.width &&
//       dino.x + dino.width > enemigo.x &&
//       dino.y < enemigo.y + enemigo.height &&
//       dino.y + dino.height > enemigo.y
//     ) {
//       // End the game
//     }
//   }
// }

// function gameLoop() {
//   dino.move();
//   checkCollisions();
//   // ...
// }

// document.addEventListener('keydown', function(event) {
//     if (event.keyCode === 32) {
//       dino.jump();
//     }
//   });

const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

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
  const dinoRight = dinoX + 50;
  const dinoBottom = dinoY + 50;
  const enemyRight = enemyX + 50;
  const enemyBottom = enemyY + 50;

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

function gameOver(){
    console.log("GAME OVER");
}

// Set up key listeners for jumping
document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    jump();
  }
});

// Start the game loop
setInterval(() => {
  draw();
  update();
}, 1000 / 60);
