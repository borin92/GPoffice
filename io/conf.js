const socketio = require("socket.io");
const map = require("./map.js")();
const fs = require("fs");
const stringToWrite = "HELLO I AM WRITTEN TO THE FILE";

module.exports = function (server) {
  // io server
  const io = socketio(server);

  // game state (players list)
  const players = {};
  var test = [];
  for (let x = 0; x < map.length; x++) {
    var maps = map[x];
    for (let y = 0; y < maps.length; y++) {
      if (map[x][y] === 1) {
        /*             ctx.beginPath();
        ctx.fillRect(x, y, 1, 1);
        ctx.fillStyle = c;
        ctx.fill(); */
        test.push([x, y]);
      }
    }
  }
  function update() {
    io.volatile.emit("players list", Object.values(players));
  }

  setInterval(update, 950 / 60);

  io.on("connection", function (socket) {
    // register new player
    players[socket.id] = {
      playerName: "",
      x: 850,
      y: 442,
      size: 20,
      speed: 1,
      floor: 0,
      socketId: socket.id,
      sprite: "",
      lastX: 321,
      lastY: 193,
      c: "#" + (((1 << 24) * Math.random()) | 0).toString(16),
    };

    //add username
    socket.on("username", function (username) {
      players[socket.id].playerName = username;
      players[socket.id].sprite = "spriteDown1.png";
      io.volatile.emit("wall", test);
    });
    socket.on("first", function (username) {
      io.volatile.emit("wall", test);
    });
    // delete disconnected player
    socket.on("disconnect", function () {
      delete players[socket.id];
    });

    socket.on("move left", function () {
      if (checkPixel(players[socket.id].x - 1, players[socket.id].y) !== 1) {
        players[socket.id].x -= players[socket.id].speed;

        if (!players[socket.id].sprite.startsWith("spriteLeft")) {
          players[socket.id].sprite = "spriteLeft4.png";
        }
        if (players[socket.id].x == players[socket.id].lastX - 25) {
          players[socket.id].lastX = players[socket.id].x;
          switch (players[socket.id].sprite) {
            case "spriteLeft1.png":
              return (players[socket.id].sprite = "spriteLeft2.png");
            case "spriteLeft2.png":
              return (players[socket.id].sprite = "spriteLeft3.png");
            case "spriteLeft3.png":
              return (players[socket.id].sprite = "spriteLeft4.png");
            case "spriteLeft4.png":
              return (players[socket.id].sprite = "spriteLeft1.png");
          }
        }
      }
    });

    socket.on("move up", function () {
      if (checkPixel(players[socket.id].x, players[socket.id].y - 1) !== 1) {
        players[socket.id].y -= players[socket.id].speed;

        if (!players[socket.id].sprite.startsWith("spriteTop")) {
          players[socket.id].sprite = "spriteTop4.png";
        }
        if (players[socket.id].y == players[socket.id].lastY - 25) {
          players[socket.id].lastY = players[socket.id].y;
          switch (players[socket.id].sprite) {
            case "spriteTop1.png":
              return (players[socket.id].sprite = "spriteTop2.png");
            case "spriteTop2.png":
              return (players[socket.id].sprite = "spriteTop3.png");
            case "spriteTop3.png":
              return (players[socket.id].sprite = "spriteTop4.png");
            case "spriteTop4.png":
              return (players[socket.id].sprite = "spriteTop1.png");
          }
        }
      }
    });

    socket.on("move right", function () {
      if (checkPixel(players[socket.id].x + 1, players[socket.id].y) !== 1) {
        players[socket.id].x += players[socket.id].speed;
        if (!players[socket.id].sprite.startsWith("spriteRight")) {
          players[socket.id].sprite = "spriteRight3.png";
        }
        if (players[socket.id].x == players[socket.id].lastX + 25) {
          players[socket.id].lastX = players[socket.id].x;
          switch (players[socket.id].sprite) {
            case "spriteRight1.png":
              return (players[socket.id].sprite = "spriteRight2.png");
            case "spriteRight2.png":
              return (players[socket.id].sprite = "spriteRight3.png");
            case "spriteRight3.png":
              return (players[socket.id].sprite = "spriteRight4.png");
            case "spriteRight4.png":
              return (players[socket.id].sprite = "spriteRight1.png");
          }
        }
      }
    });

    socket.on("move down", function () {
      if (checkPixel(players[socket.id].x, players[socket.id].y + 1) !== 1) {
        players[socket.id].y += players[socket.id].speed;

        if (!players[socket.id].sprite.startsWith("spriteDown")) {
          players[socket.id].sprite = "spriteDown3.png";
        }
        if (players[socket.id].y == players[socket.id].lastY + 25) {
          players[socket.id].lastY = players[socket.id].y;
          switch (players[socket.id].sprite) {
            case "spriteDown1.png":
              return (players[socket.id].sprite = "spriteDown2.png");
            case "spriteDown2.png":
              return (players[socket.id].sprite = "spriteDown4.png");
            case "spriteDown4.png":
              return (players[socket.id].sprite = "spriteDown3.png");
            case "spriteDown3.png":
              return (players[socket.id].sprite = "spriteDown1.png");
          }
        }
      }
    });
  });
};

function checkPixel(x, y) {
  var pixelValue = map[x][y];
  console.log(x, y);
  writePosInTxt(x, y);
  return pixelValue;
}

function writePosInTxt(x, y) {
  fs.appendFile("./pos.txt", `${x},${y} \r\n`, (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
}
