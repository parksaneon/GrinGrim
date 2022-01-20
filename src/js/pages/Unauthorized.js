export default () => ({
  getData() {
    return { data: null };
  },

  getHtml() {
    return `
		<section class="wrong-access message">
			<h2 class="message-title">로그인 먼저 해주세요</h2>
			<a href="/">메인 페이지로 이동하기</a>
		</section>
    `;
  },

  eventBinding() {
    return null;
  }
});
