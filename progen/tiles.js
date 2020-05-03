const gridSize = 30;
const tileSize = 15;
var svgns = "http://www.w3.org/2000/svg";

let xOffset = 0;
let yOffset = 0;
document.addEventListener("keyup", (event) => {
  event.preventDefault();
  switch (event.key) {
    case "ArrowLeft":
      xOffset -= 1;
      break;
    case "ArrowRight":
      xOffset += 1;
      break;
    case "ArrowUp":
      yOffset -= 1;
      break;
    case "ArrowDown":
      yOffset += 1;
      break;
    default:
      xOffset = 0;
      yOffset = 0;
      refreshTiles();
      break;
  }
  refreshTiles();
});

const refreshTiles = () => {
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
        (Math.sin(
          ((i + xOffset) * 30 * 0.1 + (j + yOffset) * 43 * 0.1) * 437057.545323
        ) *
          1000000) &
        255;
      newTile.style.fill = `rgba(${a},${a},${a})`;
      svg.appendChild(newTile);
    }
  }
};
