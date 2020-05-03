let points = [
  { x: 0, y: 100 },
  { x: 350, y: 50 },
  { x: 700, y: 100 },
];
let hardness = 10;
function refreshPoints() {
  let pointsNew = [];
  for (let i = 0; i < points.length - 1; i++) {
    hardness = hardness / 2;
    let newX = (points[i].x + points[i + 1].x) / 2;
    let yAvg = (points[i].y + points[i + 1].y) / 2;
    let newY = Math.random() * (Math.random() > 0.5 ? 1 : -1) * hardness;
    if (newY < 0) {
      newY = 100 - newY;
    }
    pointsNew.push(points[i]);
    pointsNew.push({ x: newX, y: newY });
    if (i + 1 === points.length - 1) {
      pointsNew.push(points[i + 1]);
    }
  }
  points = [...pointsNew];
  document.getElementById("line").setAttribute("points", createPointString());
}

function createPointString() {
  let str = "";
  points.forEach((point) => {
    str += `${point.x},${point.y} `;
  });
  return str;
}
