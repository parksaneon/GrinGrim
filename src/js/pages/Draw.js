import axios from 'axios';

export default () => ({
  getData() {
    return axios.get(`/category/random`);
  },

  getHtml({ id, name: subject }) {
    return `
    <section class="drawing-container">
      <time class="timer">00:00:30</time>
      <div class="canvas-container">
        <canvas class="my-canvas" width="500" height="500"></canvas>
      </div>
      <div class="subject-container">
        <p data-categoryId="${id}" class="subject">주제는 ${subject}</p>
        <img src="/img/icon-giraffe.svg" alt="기린" class="icon-giraffe"></img>
      </div>
    </section>`;
  },

  eventBinding(el) {
    const $canvas = el.querySelector('.my-canvas');
    const $drawingContainer = el.querySelector('.drawing-container');
    const $timer = el.querySelector('.timer');
    const { categoryid } = el.querySelector('.subject').dataset;

    let countdown = null;
    let isDrawing = false;
    let timer = 1;
    let isFinished = false;

    const ctx = $canvas.getContext('2d');

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

    const uploadDrawing = () => {
      const image = $canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
      const file = convertToBlob(image);
      const fileName = 'canvas' + new Date().getTime() + '.png';
      const formData = new FormData();
      formData.append('file', file, fileName);
      formData.append('categoryId', categoryid);
      formData.append('userId', 1);
      try {
        return axios.post('/drawings', formData, {
          withCredentials: true,
          processData: false,
          contentType: false
        });
      } catch (error) {
        return console.error(error);
      }
    };

    const run = async () => {
      if (isFinished) {
        clearInterval(countdown);
        const {
          data: { id: drawingId }
        } = await uploadDrawing();

        // console.log(categoryid, drawingId);

        $drawingContainer.innerHTML += `<div class="layer"></div>
        <div class="popup">
          <h2>게임이 종료되었어요!</h2> 
          <p> 다른 사람들은 어떻게 그렸는지 확인하러 갈까요?</p>
          <a class="close-popup" href="/result?categoryId=${categoryid}&drawingId=${drawingId}">결과 보기</a>
        </div>`;
      } else {
        $timer.textContent = `00:00:${timer < 10 ? '0' + timer : timer}`;
        timer -= 1;
        isFinished = timer < 0;
      }
    };
    countdown = setInterval(run, 1000);

    const draw = e => {
      const x = e.type === 'touchmove' ? e.changedTouches[0].pageX - e.target.getBoundingClientRect().left : e.offsetX;
      const y = e.type === 'touchmove' ? e.changedTouches[0].pageY - e.target.getBoundingClientRect().top : e.offsetY;
      if (isDrawing) {
        ctx.lineTo(x, y);
        ctx.stroke();
      } else {
        ctx.moveTo(x, y);
      }
    };

    const startDrawing = () => {
      isDrawing = true;
      ctx.beginPath();
    };

    const finishDrawing = () => {
      isDrawing = false;
      ctx.closePath();
    };

    $canvas.addEventListener('mousedown', startDrawing);
    $canvas.addEventListener('mousemove', draw);
    $canvas.addEventListener('mouseup', finishDrawing);

    $canvas.addEventListener('touchmove', draw);
    $canvas.addEventListener('touchstart', startDrawing);
    $canvas.addEventListener('touchend', finishDrawing);
    $canvas.addEventListener('touchcancel', finishDrawing);
  }
});
