import regenerato from 'regenerator-runtime';
import axios from 'axios';
import render from './result.js';

const $canvas = document.querySelector('.my-canvas');
const $drawingContainer = document.querySelector('.drawing-container');
const $timer = document.querySelector('.timer');

let timer = 10;
let isFinished = false;
let countdown = null;

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
      withCredentials: true,
      processData: false,
      contentType: false
    });
  } catch (error) {
    console.error(error);
  }
};

const run = () => {
  if (isFinished) {
    clearInterval(countdown);
    $drawingContainer.innerHTML = `<div class="layer"></div>
		<div class="popup">
			<h2>게임이 종료되었어요!</h2> 
			<p> 다른 사람들은 어떻게 그렸는지 확인하러 갈까요?</p>
			<a class="close-popup" href="/result">결과 보기</a>
		</div>`;
  } else {
    $timer.textContent = `00:00:${timer < 10 ? '0' + timer : timer}`;
    timer -= 1;
    if (timer < 0) isFinished = true;
  }
};

const getDrawingSubject = async () => {
  try {
    const $subject = document.querySelector('.subject');
    const { data: category } = await axios.get('http://localhost:8000/categories', { withCredentials: true });
    console.log(category);
    $subject.textContent = `주제는 "${category}"`;
    countdown = setInterval(run, 1000);
  } catch (error) {
    console.error(error);
  }
};

window.addEventListener('DOMContentLoaded', getDrawingSubject);

const displayResult = e => {
  if (!e.target.matches('.close-popup')) return;
  try {
    uploadCanvas();
    render();
  } catch (error) {
    console.error();
  }
};

$drawingContainer.addEventListener('click', displayResult);

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
