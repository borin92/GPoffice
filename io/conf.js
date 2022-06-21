const socketio = require("socket.io");

module.exports = function (server) {
  // io server
  const io = socketio(server);

  // game state (players list)
  const players = {};
  function update() {
    io.volatile.emit("players list", Object.values(players));
  }

  setInterval(update, 1000 / 60);

  io.on("connection", function (socket) {
    // register new player
    players[socket.id] = {
      playerName: "",
      x: 490,
      y: 0,
      size: 20,
      speed: 1,
      floor: 0,
      socketId: socket.id,
      c: "#" + (((1 << 24) * Math.random()) | 0).toString(16),
    };
    //add username
    socket.on("username", function (username) {
      players[socket.id].playerName = username;
    });
    // delete disconnected player
    socket.on("disconnect", function () {
      delete players[socket.id];
    });
    socket.on("move left", function () {
      if (!players[socket.id].x <= 0) {
        players[socket.id].x -= players[socket.id].speed;
      }
    });
    socket.on("move up", function () {
      if (!players[socket.id].y <= 0) {
        players[socket.id].y -= players[socket.id].speed;
      }
    });
    socket.on("move right", function () {
      if (players[socket.id].x <= 620) {
        players[socket.id].x += players[socket.id].speed;
      }
    });
    socket.on("move down", function () {
      if (players[socket.id].y <= 620) {
        players[socket.id].y += players[socket.id].speed;
      }
    });
  });
};
