import axios from 'axios';

const root = document.getElementById('root');
const ranking = document.getElementById('ranking');

const CATEGORY = '정신';

const render = async () => {
  const { data: categoryRankingDrawings } = await axios.get(`http://localhost:8000/drawings?category=${CATEGORY}`);

  root.innerHTML = categoryRankingDrawings
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

ranking.onclick = e => {
  e.preventDefault();
  const path = e.target.getAttribute('href');
  window.history.pushState({ path }, null, path);

  render();
};
