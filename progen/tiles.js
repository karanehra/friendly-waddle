const gridSize = 100;
const tileSize = 5;
var svgns = "http://www.w3.org/2000/svg";

const refreshTiles = () => {
  console.log("hello");
  let svg = document.getElementById("svg");
  svg.innerHTML = "";
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      let newTile = document.createElementNS(svgns, "rect");
      newTile.setAttribute("x", `${i * tileSize}`);
      newTile.setAttribute("y", `${j * tileSize}`);
      newTile.setAttribute("width", tileSize);
      newTile.setAttribute("height", tileSize);
      let a =
        (Math.sin((i * 30 * 0.1 + j * 43 * 0.1) * 437057.545323) * 1000000) &
        255;
      newTile.style.fill = `rgba(${a},${a},${a})`;
      svg.appendChild(newTile);
    }
  }
};
