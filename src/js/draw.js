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

const uploadCanvas = () => {
  const image = $canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
  const file = convertToBlob(image);
  const fileName = 'canvas' + new Date().getTime() + '.png';
  const formData = new FormData();
  formData.append('file', file, fileName);
  try {
    axios.post('http://localhost:8000/drawings', formData, {
      processData: false,
      contentType: false
    });
  } catch (error) {
    console.error();
  }
};

const $root = document.querySelector('#root');
const $timer = document.querySelector('.timer');

let timer = 30;
let isFinished = false;
let countdown = null;

const run = () => {
  if (isFinished) {
    clearInterval(countdown);
    uploadCanvas();
    $root.innerHTML = `<div class="layer"></div>
		<div class="popup">
			<p>게임이 종료되었어요! 다른 사람들은 어떻게 그렸는지 확인하러 갈까요?</p>
			<button class="close-popup">결과 보기</button>
		</div>`;
  } else {
    $timer.textContent = `00:00:${timer < 10 ? '0' + timer : timer}`;
    timer--;
    if (timer < 0) isFinished = true;
  }
};

const getDrawingSubject = async () => {
  const { data: subject } = await axios.get('http://localhost:8000/categories');
  const $subject = document.querySelector('.subject');
  $subject.textContent = `주제는 "${subject.subject}"`;
  countdown = setInterval(run, 1000);
};

window.addEventListener('DOMContentLoaded', getDrawingSubject);
