import axios from 'axios';

const root = document.getElementById('root');

const USER_ID = 10;

// const render = async path => {
//   console.log(path);
//   try {
//     const { data: mydrawings } = await axios.get(`${path}/${USER_ID}`);

//     root.innerHTML = mydrawings
//       .map(
//         ({ id, url, likedUserId, nickname }) => `
//         <div data-id="${id}">
//           <img src="${url}">
//           <p>좋아요 수: ${likedUserId.length}</p>
//           <p>작성자: ${nickname}</p>
//         </div>
//       `
//       )
//       .join('');
//   } catch (e) {
//     console.error(e);
//   }
// };

const render = mydrawings => {
  root.innerHTML = mydrawings
    .map(
      ({ id, url, likedUserId, nickname }) => `
        <div data-id="${id}">
          <img src="${url}">
          <p>좋아요 수: ${likedUserId.length}</p>
          <p>작성자: ${nickname}</p>
        </div>
      `
    )
    .join('');
};

// window.addEventListener('popstate', e => {
//   // e.state는 pushState 메서드의 첫번째 인수
//   console.log('[popstate]', e.state); // {path: '/'} {path: '/service'} {path: '/about'}

//   // 이전페이지 / 다음페이지 버튼이 클릭되면 render를 호출
//   render(e.state ? e.state.path : '/');
// });

export const fetch = async path => {
  window.history.pushState({ path }, null, path);

  const { data: mydrawings } = await axios.get(path);
  render(mydrawings);
};
