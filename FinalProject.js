const container = document.getElementById("container");
const paddle1 = document.getElementById("player1");
const paddle2 = document.getElementById("player2");
const ball = document.getElementById("ball");
const player1Score = document.getElementById("player1Score");
const player2Score = document.getElementById("player2Score");
const containerWidth = parseInt(getComputedStyle(container).width);
const containerHeight = parseInt(getComputedStyle(container).height);
const paddleHeight = parseInt(getComputedStyle(paddle1).height);
const paddleWidth = parseInt(getComputedStyle(paddle1).width);
const ballWidth = parseInt(getComputedStyle(ball).width);
const ballHeight = parseInt(getComputedStyle(ball).height);

// How fast the ball and paddle move
const paddleSpeed = 5;
const ballSpeed = 4;


let paddle1Y = 160;
let paddle2Y = 160;
let ballX = containerWidth / 2 - ballWidth / 2;
let ballY = containerHeight / 2 - ballHeight / 2;
let ballSpeedX = Math.random() < 0.5 ? ballSpeed : -ballSpeed;
let ballSpeedY = Math.random() < 0.5 ? ballSpeed : -ballSpeed;
let player1ScoreCount = 0;
let player2ScoreCount = 0;

// Updates the position of the ball and paddle
function update() {
    if (keys[87] && paddle1Y > 0) {
      paddle1Y -= paddleSpeed;
    }
    if (keys[83] && paddle1Y < containerHeight - paddleHeight) {
      paddle1Y += paddleSpeed;
    }
    if (keys[38] && paddle2Y > 0) {
      paddle2Y -= paddleSpeed;
    }
    if (keys[40] && paddle2Y < containerHeight - paddleHeight) {
      paddle2Y += paddleSpeed;
    }
  
    // Moving the ball
    ballX += ballSpeedX;
    ballY += ballSpeedY;
    ball.style.left = ballX + "px";
    ball.style.top = ballY + "px";
  
    // Checking for collisions with walls and paddles
  if (ballY < 0) {
    ballSpeedY = -ballSpeedY;
    ballY = 0;
  }
  if (ballY + ballHeight > containerHeight) {
    ballSpeedY = -ballSpeedY;
    ballY = containerHeight - ballHeight;
  }
  if (ballX < 0) {
    player2ScoreCount++;
    player2Score.innerHTML = player2ScoreCount;
    resetBall();
  }
  if (ballX + ballWidth > containerWidth) {
    player1ScoreCount++;
    player1Score.innerHTML = player1ScoreCount;
    resetBall();
  }
  if (ballX < paddleWidth && ballY + ballHeight > paddle1Y && ballY < paddle1Y + paddleHeight) {
    ballSpeedX = -ballSpeedX;
    ballX = paddleWidth;
  }
  if (ballX + ballWidth > containerWidth - paddleWidth && ballY + ballHeight > paddle2Y && ballY < paddle2Y + paddleHeight) {
    ballSpeedX = -ballSpeedX;
    ballX = containerWidth - paddleWidth - ballWidth;
  }

  // First player to 10 points wins
  if (player1ScoreCount === 10) {
    endGame("Player 1 wins!");
  }
  if (player2ScoreCount === 10) {
    endGame("Player 2 wins!");
  }

}

// Resets the ball to the middle of the container  
function resetBall() {
  ballX = containerWidth / 2 - ballWidth / 2;
  ballY = containerHeight / 2 - ballHeight / 2;
  ballSpeedX = Math.random() < 0.5 ? ballSpeed : -ballSpeed;
  ballSpeedY = Math.random() < 0.5 ? ballSpeed : -ballSpeed;
  ball.style.left = ballX + "px";
  ball.style.top = ballY + "px";
  }
  
// Alerts the user once a player reaches 10 points the winner
function endGame(message) {
  alert(message);
  player1ScoreCount = 0;
  player2ScoreCount = 0;
  player1Score.innerHTML = "0";
  player2Score.innerHTML = "0";
  }
  
// Controls for the keyboard
let keys = {};
document.addEventListener("keydown", function (event) {
  keys[event.key] = true;
});
document.addEventListener("keyup", function (event) {
  delete keys[event.key];
});

function movePaddles() {
  // Paddle 1
  if (keys["w"]) {
    paddle1Y -= paddleSpeed;
    }
  if (keys["s"]) {
    paddle1Y += paddleSpeed;
    }
    
  // Paddle 2
  if (keys["ArrowUp"]) {
    paddle2Y -= paddleSpeed;
    }
  if (keys["ArrowDown"]) {
    paddle2Y += paddleSpeed;
    }

  // Preventing the paddles from going off the container
  if (paddle1Y < 0) {
    paddle1Y = 0;
  }
  if (paddle1Y + paddleHeight > containerHeight) {
    paddle1Y = containerHeight - paddleHeight;
  }
  if (paddle2Y < 0) {
    paddle2Y = 0;
  }
  if (paddle2Y + paddleHeight > containerHeight) {
    paddle2Y = containerHeight - paddleHeight;
  }

  paddle1.style.top = paddle1Y + "px";
  paddle2.style.top = paddle2Y + "px";
}

// Loop that restarts the game with the paddles in the correct place
setInterval(function () {
    movePaddles();
    update();
  }, 1000 / 60);
  
      