import regenerato from 'regenerator-runtime';
import axios from 'axios';

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

const convertToBlob = base64 => {
  const decodImg = atob(base64.split(',')[1]);
  const array = [];
  for (let i = 0; i < decodImg.length; i++) {
    array.push(decodImg.charCodeAt(i));
  }
  return new Blob([new Uint8Array(array)], {
    type: 'image/png'
  });
};

const uploadCanvas = async () => {
  const image = $canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
  const file = convertToBlob(image);
  const fileName = 'canvas' + new Date().getTime() + '.png';
  const formData = new FormData();
  formData.append('file', file, fileName);

  axios.post('http://localhost:8000/drawings', formData, {
    processData: false,
    contentType: false
  });
};

document.querySelector('.save').addEventListener('click', uploadCanvas);
