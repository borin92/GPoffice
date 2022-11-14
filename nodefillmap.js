const map = require("./io/map.js")();

const fs = require("fs");

fs.readFile("./pos.txt", "utf8", (err, data) => {
  data = data.replace(/\n|\r/g, "");
  //data = data.replace(/,/g, " ");
  data = data.split(" ");

  data.forEach((x) => {
    var xP = x.replace(/,/g, " ").split(" ")[0];

    var y = x.replace(/,/g, " ").split(" ")[1];

    if (xP === undefined || y === undefined) {
      return;
    }
    // a ce moment on peux recuperer la valeur de du pixel reste plus qu'a l'update avec un 1
    map[xP][y] = 1;
  });
  console.log(map[300][194]);
  fs.writeFile("testMap.js", JSON.stringify(map), (err) => {
    return console.log(err);
  });
  if (err) throw err;
});
