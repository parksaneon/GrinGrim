import axios from 'axios';

export default class {
  constructor() {
    document.title = 'Mydrawings';
  }

  async getHtml() {
    const USER_ID = 10;
    const { data: mydrawings } = await axios.get(`/drawings/userid/${USER_ID}`);

    return mydrawings
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
  }
}
