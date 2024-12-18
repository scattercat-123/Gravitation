const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const weightInput = document.getElementById('weight');
const gravityInput = document.getElementById('gravity');
const distanceInput = document.getElementById('distance');
const startButton = document.getElementById('start');
const colorInput = document.querySelector('#color input'); // Select the color input

let ball = { x: canvas.width / 3.4, y: 50, radius: 15, velocityY: 0, color: 'blue' }; // Add color property
let gravity = 9.8;
let weight = 1;
let distance = 100;
let animationFrame;

// Update the ball's color dynamically when the color input changes
colorInput.addEventListener('input', () => {
  ball.color = colorInput.value; // Update the ball's color
  drawBall(); // Immediately redraw the ball with the new color
});

// Start the animation when the start button is clicked
startButton.addEventListener('click', () => {
  weight = parseFloat(weightInput.value);
  gravity = parseFloat(gravityInput.value);
  distance = parseFloat(distanceInput.value);
  ball.y = 50;
  ball.velocityY = 0;
  cancelAnimationFrame(animationFrame);
  animate();
});

function drawBall() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = ball.color; // Use the updated color
  ctx.fill();
  ctx.closePath();
}

function animate() {
  ball.velocityY += (gravity * weight) / Math.pow(distance, 2);
  ball.y += ball.velocityY;

  // Bounce if the ball hits the bottom
  if (ball.y + ball.radius >= canvas.height) {
    ball.y = canvas.height - ball.radius;
    ball.velocityY *= -0.7;
  }

  drawBall();
  animationFrame = requestAnimationFrame(animate);
}

// Initial draw
drawBall();
