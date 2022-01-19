export default () => ({
  getData() {
    return { data: null };
  },

  getHtml() {
    return `
      <h1>로그인 해주세요</h1>
      <a href="/">메인 페이지로 이동하기</a>
    `;
  },

  eventBinding() {
    return null;
  }
});
