import axios from 'axios';

export default () => ({
  async getData() {
    const res = await axios.get(`/drawings/userid/${1}`);
    return res;
  },

  getHtml(mydrawings) {
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
  },

  eventBinding() {
    return null;
  }
});
