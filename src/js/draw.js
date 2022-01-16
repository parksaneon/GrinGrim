import regenerato from 'regenerator-runtime';
import axios from 'axios';

const $canvas = document.querySelector('.my-canvas');
const $drawingContainer = document.querySelector('.drawing-container');
const $timer = document.querySelector('.timer');
const $root = document.getElementById('root');

let categoryId = 0;

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
  formData.append('categoryId', categoryId);
  return axios.post('http://localhost:8000/drawings', formData, {
    withCredentials: true,
    processData: false,
    contentType: false
  });
};

const run = () => {
  if (isFinished) {
    clearInterval(countdown);
    $drawingContainer.innerHTML += `<div class="layer"></div>
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
    $subject.textContent = `주제는 "${category.name}"`;
    categoryId = category.id;
    countdown = setInterval(run, 1000);
  } catch (error) {
    console.error(error);
  }
};

window.addEventListener('DOMContentLoaded', getDrawingSubject);

const displayResult = async e => {
  e.preventDefault();
  if (!e.target.matches('.close-popup')) return;
  try {
    const { data: drawingId } = await uploadCanvas();
    const { data: myDrawing } = await axios.get(`http://localhost:8000/drawings/${drawingId.id}`);
    const { data: recentDrawingsWithNickname } = await axios.get(
      `http://localhost:8000/drawings/category/${categoryId}?limit=4`
    );
    $root.innerHTML =
      myDrawing
        .map(
          ({ url }) =>
            `
						<section class="result-container">
						<figure>
							<img src="http://localhost:8000/${url}" alt="내 그림" />
						</figure>
						<a href="/" class="fas fa-3x fa-home home"></a>
						<p>다른 사람들은 어떻게 그렸을까요?</p>
						<div class="drawings">
						`
        )
        .join('') +
      recentDrawingsWithNickname
        .map(
          drawing =>
            `
					<figure>
					<img src="http://localhost:8000/${drawing.url}" alt="다른 유저 그림" />
					<figcaption>
						<i class="fas fa-heart like"></i>
						<span>${drawing.likedUserId.length}</span>
						<span class="nickname">${drawing.nickname}</span>
					</figcaption>
				</figure>
				`
        )
        .join('') +
      `</div></section>`;
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
