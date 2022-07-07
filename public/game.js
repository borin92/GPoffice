const socket = io();

// const player = {
//   x: 0,
//   y: 0,
//   size: 20,
//   speed: 5
// };

let players = [];
const keyboard = {};

const ctx = canvas.getContext("2d");
var background = new Image();
background.src = "map.png";
ctx.font = "25px Arial";

function drawPlayers() {
  ctx.drawImage(background, 0, 0); // 1.
  players.forEach(function ({ x, y, size, c, playerName, sprite }) {
    ctx.beginPath();
    var playerSprite = new Image();
    playerSprite.src = sprite;
    ctx.drawImage(playerSprite, x, y);
    ctx.fillStyle = c;
    ctx.fill();
    ctx.fillStyle = "black";
    ctx.fillText(playerName, x - 25, y - 5);
  });
}

function update() {
  //ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPlayers(); // 2.
}

function movePlayer() {
  if (keyboard["ArrowLeft"]) socket.emit("move left");
  if (keyboard["ArrowUp"]) socket.emit("move up");
  if (keyboard["ArrowRight"]) socket.emit("move right");
  if (keyboard["ArrowDown"]) socket.emit("move down");
}

function update() {
  //ctx.clearRect(0, 0, canvas.width, canvas.height);
  movePlayer(); // *
  drawPlayers();
  requestAnimationFrame(update);
}
window.onkeydown = function (e) {
  keyboard[e.key] = true;
};

window.onkeyup = function (e) {
  delete keyboard[e.key];
};

// first call
function startGame(username) {
  document.getElementById("canvas").classList.remove("hidden");
  document.getElementById("input").classList.add("hidden");
  requestAnimationFrame(update);
  socket.emit("username", username);
}

socket.on("players list", function (list) {
  players = list;
});

var map = [[], []];
var test = [];

/* function mapArr(arr, increment) {
  for (let index = 467; index < increment; index++) {
    const element = array[index][209];
  }
}
 */
