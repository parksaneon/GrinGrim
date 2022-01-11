const $canvas = document.querySelector('.my-canvas');
const ctx = $canvas.getContext('2d');

let isDrawing = false;

const draw = e => {
  const x = e.offsetX;
  const y = e.offsetY;
  if (isDrawing) {
    ctx.lineTo(x, y);
    ctx.stroke();
  } else {
    ctx.beginPath();
    ctx.moveTo(x, y);
  }
};

const startDrawing = () => {
  isDrawing = true;
};

const finishDrawing = () => {
  isDrawing = false;
};

$canvas.addEventListener('mousemove', draw);
$canvas.addEventListener('mousedown', startDrawing);
$canvas.addEventListener('mouseup', finishDrawing);
$canvas.addEventListener('mouseleave', finishDrawing);
