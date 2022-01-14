import axios from 'axios';

const root = document.getElementById('root');
const ranking = document.getElementById('ranking');

// const route = {
//   '/ranking': '/drawings/category/1',
//   '/ranking/turtle': '/drawings/category/2',
//   '/ranking/rabbit': '/drawings/category/3'
// };

const categoryId = 1;

const render = async path => {
  try {
    const { data: drawings } = await axios.get(`${path}`);

    root.innerHTML =
      `
    <ul class="category-list">
      <li class="category-item"><a href="/ranking/1">1</a></li>
      <li class="category-item"><a href="/ranking/2">2</a></li>
      <li class="category-item"><a href="/ranking/3">3</a></li>
    </ul>` +
      drawings
        .map(
          ({ id, url, likedUserId }) => `
          <div data-id="${id}">
            <img src="${url}">
            <p>좋아요 수: ${likedUserId.length}</p>
            <p>작성자: </p>
          </div>
        `
        )
        .join('');
  } catch (e) {
    console.error(e);
  }
};

ranking.onclick = e => {
  e.preventDefault();

  const path = e.target.getAttribute('href');
  window.history.pushState({ path }, null, path);

  render(path);
};

root.onclick = e => {
  e.preventDefault();
  if (!e.target.matches('.category-list > .category-item > a')) return;
  const path = e.target.getAttribute('href');
  console.log(path);
  window.history.pushState({ path }, null, path);

  render(path);
};
