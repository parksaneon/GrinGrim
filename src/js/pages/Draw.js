import axios from 'axios';

export default () => ({
  getData() {
    return axios.get(`/category/random`);
  },

  getHtml({ name: subject }) {
    return `
    <section class="drawing-container">
      <time class="timer">00:00:30</time>
      <div class="canvas-container">
        <canvas class="my-canvas" width="500" height="500"></canvas>
      </div>
      <div class="subject-container">
        <p data-category="${subject}" class="subject">주제는 ${subject}</p>
        <img src="/img/icon-giraffe.svg" alt="기린" class="icon-giraffe"></img>
      </div>
    </section>`;
  },

  eventBinding(el) {
    const $canvas = el.querySelector('.my-canvas');
    const $drawingContainer = el.querySelector('.drawing-container');
    const $timer = el.querySelector('.timer');
    const { category } = el.querySelector('.subject').dataset;

    let countdown = null;
    let isDrawing = false;
    let timer = 1;
    let isFinished = false;

    const ctx = $canvas.getContext('2d');

    const run = () => {
      if (isFinished) {
        clearInterval(countdown);
        $drawingContainer.innerHTML += `<div class="layer"></div>
        <div class="popup">
          <h2>게임이 종료되었어요!</h2> 
          <p> 다른 사람들은 어떻게 그렸는지 확인하러 갈까요?</p>
          <a class="close-popup" href="/result?category=${category}&drawingId=1">결과 보기</a>
        </div>`;
      } else {
        $timer.textContent = `00:00:${timer < 10 ? '0' + timer : timer}`;
        timer -= 1;
        isFinished = timer < 0;
      }
    };
    countdown = setInterval(run, 1000);

    const startDrawing = () => {
      isDrawing = true;
    };

    const finishDrawing = () => {
      isDrawing = false;
    };

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

    $canvas.addEventListener('mousedown', startDrawing);
    $canvas.addEventListener('mousemove', draw);
    $canvas.addEventListener('mouseup', finishDrawing);
  }
});
