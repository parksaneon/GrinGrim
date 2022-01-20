export default () => ({
  getData() {
    return { data: null };
  },

  getHtml() {
    return `
		<section class="wrong-access message">
			<h2 class="message-title">찾는 페이지가 없습니다.</h2>
			<a href="/">메인 페이지로 이동하기</a>
		</section>
    `;
  },

  eventBinding() {
    return null;
  }
});
