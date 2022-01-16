import axios from 'axios';

const root = document.getElementById('root');
const mydrawings = document.getElementById('mydrawings');

const USER_ID = 10;

const render = async () => {
  const { data: mydrawings } = await axios.get(`http://localhost:8000/drawings/${USER_ID}`);
  root.innerHTML = mydrawings
    .map(
      ({ id, url, likedUserId, nickname }) => `
      <div data-id="${id}">
        <img src="http://localhost:8000${url}">
        <p>좋아요 수: ${likedUserId.length}</p>
        <p>작성자: ${nickname}</p>
      </div>
    `
    )
    .join('');
};

mydrawings.onclick = e => {
  e.preventDefault();
  const path = e.target.getAttribute('href');
  window.history.pushState({ path }, null, path);

  render();
};
