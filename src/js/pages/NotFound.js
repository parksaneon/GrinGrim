export default () => ({
  getData() {
    return { data: null };
  },

  getHtml() {
    return `
      <h1>찾으시는 페이지가 없습니다.</h1>
      <a href="/">메인 페이지로 이동하기</a>
    `;
  },

  eventBinding() {
    return null;
  }
});
