const socket = io();

// const player = {
//   x: 0,
//   y: 0,
//   size: 20,
//   speed: 5
// };

let players = [];
const keyboard = {};
let walle = [];
var buffer = 0;
if ((buffer = 0)) {
  buffer = 2;
  socket.emit("first");
}

const ctx = canvas.getContext("2d");
var background = new Image();
background.src = "map.png";
ctx.font = "25px Arial";

function drawPlayers() {
  ctx.drawImage(background, 0, 0); // 1.
  console.log(walle);
  walle.forEach((element) => {
    ctx.beginPath();
    ctx.fillRect(element[0], element[1], 3, 3);
    ctx.fillStyle = "blue";
    ctx.fill();
  });
  players.forEach(function ({ x, y, size, c, playerName, sprite }) {
    ctx.beginPath();
    ctx.fillRect(x, y, 1, 1);
    ctx.fillStyle = c;
    ctx.fill();
    /*     var playerSprite = new Image();
    playerSprite.src = sprite;
    ctx.drawImage(playerSprite, x, y); */
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
socket.on("wall", function (wall) {
  walle = wall;
  console.log(walle);
});

var map = [[], []];
var test = [];

/* function mapArr(arr, increment) {
  for (let index = 467; index < increment; index++) {
    const element = array[index][209];
  }
}
 */
