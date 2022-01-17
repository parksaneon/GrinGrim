import axios from 'axios';

export default () => ({
  async getData(query) {
    query = query || 'category=기린';
    const category = query.split('=')[1];
    const { data: categoryId } = await axios.get(`/category?category=${category}`);
    return axios.get(`drawings/category/${categoryId}`);
  },

  getHtml(ranking) {
    return ranking
      .map(
        ({ id, categoryid, likedUserId, url, nickname }) => `
              <img src="${url}">
              <div>아이디: ${id}</div>
              <div>카테고리 아이디: ${categoryid}</div>
              <div>좋아요: ${likedUserId.length}</div>
              <div>닉네임: ${nickname}</div>
          `
      )
      .join('');
  },

  eventBinding() {
    return null;
  }
});

// import axios from 'axios';

// export default class {
//   constructor() {
//     document.title = 'Ranking';
//   }

//   async getHtml(query) {
//     query = query || 'category=turtle';
//     const category = query.split('=')[1];

//     return ranking
//       .map(
//         ({ id, categoryid, likedUserId, url, nickname }) => `
//         <img src="${url}">
//         <div>아이디: ${id}</div>
//         <div>카테고리 아이디: ${categoryid}</div>
//         <div>좋아요: ${likedUserId.length}</div>
//         <div>닉네임: ${nickname}</div>
//     `
//       )
//       .join('');
//   }
// }
