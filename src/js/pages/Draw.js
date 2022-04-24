import axios from 'axios';

export default () => ({
  getData() {
    return axios.get(`/category/random`);
  },

  getHtml({ id, name: subject }) {
    return `
    <section class="drawing-container">
      <time class="timer">00:00:20</time>
      <div class="canvas-container">
        <canvas class="my-canvas" width="500" height="500"></canvas>
      </div>
      <div class="subject-container">
        <p data-categoryId="${id}" class="subject">주제는 ${subject}</p>
        <img src="/img/icon-giraffe.svg" alt="기린" class="icon-giraffe"></img>
      </div>
    </section>`;
  },

  eventBinding(el, userId) {
    const $canvas = el.querySelector('.my-canvas');
    const $drawingContainer = el.querySelector('.drawing-container');
    const $timer = el.querySelector('.timer');
    const { categoryid } = el.querySelector('.subject').dataset;

    let countdown = null;
    let isDrawing = false;
    let timer = 20;
    let isFinished = false;

    const ctx = $canvas.getContext('2d');

    const convertToBlob = base64 => {
      const decodeImg = atob(base64.split(',')[1]);
      const arr = decodeImg.split('').map(char => char.charCodeAt(0));
      return new Blob([new Uint8Array(arr)], {
        type: 'image/jpg'
      });
    };

    const uploadDrawing = () => {
      const image = $canvas.toDataURL('image/jpg').replace('image/jpg', 'image/octet-stream');
      const file = convertToBlob(image);
      const fileName = `canvas${new Date().getTime()}.jpg`;
      const formData = new FormData();
      formData.append('file', file, fileName);
      formData.append('categoryId', categoryid);
      formData.append('userId', userId);
      try {
        return axios.post('/drawings', formData, {
          withCredentials: true,
          processData: false,
          contentType: false
        });
      } catch (error) {
        console.error(error);
      }
    };

    const run = async () => {
      if (!isFinished) {
        $timer.textContent = `00:00:${timer < 10 ? '0' + timer : timer}`;
        timer -= 1;
        isFinished = timer < 0;
      } else {
        clearInterval(countdown);
        const {
          data: { id: drawingId }
        } = await uploadDrawing();
        $drawingContainer.innerHTML += `<div class="layer"></div>
        <div class="popup">
          <h2>게임이 종료되었어요!</h2> 
          <p> 다른 사람들은 어떻게 그렸는지 확인하러 갈까요?</p>
          <a class="close-popup" href="/result?categoryId=${categoryid}&drawingId=${drawingId}">결과 보기</a>
        </div>`;
      }
    };

    const drawLine = (x, y) => {
      if (isDrawing) {
        ctx.lineTo(x, y);
        ctx.stroke();
      } else {
        ctx.moveTo(x, y);
      }
    };
    const moveMouse = e => {
      const x = e.offsetX;
      const y = e.offsetY;
      drawLine(x, y);
    };

    const startDrawing = () => {
      isDrawing = true;
      ctx.beginPath();
    };

    const finishDrawing = () => {
      isDrawing = false;
      ctx.closePath();
    };

    countdown = setInterval(run, 1000);

    $canvas.addEventListener('mousemove', moveMouse);
    $canvas.addEventListener('mousedown', startDrawing);
    $canvas.addEventListener('mouseup', finishDrawing);
  }
});
