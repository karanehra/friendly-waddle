const gridSize = 100;
const tileSize = 10;
var svgns = "http://www.w3.org/2000/svg";

let xOffset = 0;
let yOffset = 0;
document.addEventListener("keydown", (event) => {
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

const noise = (x, y, s = 1) => {
  return (
    (Math.sin(
      (Math.floor(x / s) * 112.01716 + Math.floor(y / s) * 718.233) *
        437057.545323
    ) *
      1000000) &
    255
  );
};

const refreshTiles = () => {
  let canvas = document.getElementById("cvs");
  let ctx = canvas.getContext("2d");

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      let values = [];
      values.push(noise(i + xOffset, j + yOffset));
      values.push(noise(i + xOffset, j + yOffset, 5));
      values.push(noise(i + xOffset, j + yOffset, 10));
      values.push(noise(i + xOffset, j + yOffset, 15));
      values.push(noise(i + xOffset + 1, j + yOffset + 44, 20));
      values.push(noise(i + xOffset + 3, j + yOffset + 4, 50));

      a = values.reduce((acc, curr) => acc + curr, 0);
      a = a / values.length;
      if (a > 150) {
        a = 255;
      } else {
        a = 0;
      }
      ctx.beginPath();
      ctx.rect(`${i * tileSize}`, `${j * tileSize}`, tileSize, tileSize);
      ctx.fillStyle = `rgba(${a},${a},${a})`;
      ctx.fill();
    }
  }
};
