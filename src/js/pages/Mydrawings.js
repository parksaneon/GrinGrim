import axios from 'axios';

export default () => ({
  async getData() {
    const USER_ID = 1;
    const { data: categories } = await axios.get('/category');
    const { data: mydrawings } = await axios.get(`/drawings/userid/${USER_ID}`);

    const getCategoryName = categoryId => categories.find(({ id }) => id === categoryId).name;
    const mydrawingsWithCategoryName = mydrawings.map(mydrawing => ({
      ...mydrawing,
      categoryName: getCategoryName(mydrawing.categoryId)
    }));

    return { data: mydrawingsWithCategoryName };
  },

  getHtml(mydrawings) {
    const myDrawingElement = mydrawings.length
      ? mydrawings
          .map(
            ({ categoryName, likedUserId, url }) => `
            <figure>
                <div class="img-container">
                  <img src="${url}">
                </div>
                <figcaption>
                  <p>주제: ${categoryName}</p>
                  <div class="like-group">
                    <i class="fas fa-heart like"></i>
                    <span>${likedUserId.length}</span>
                  </div>
                </figcaption>
            </figure>	`
          )
          .join('')
      : `
          <div class="message">
            <span>이런!</span>
            <span>아직 활동 내역이 없어요.</span>
            <span>나만의 작품을 만들어 볼까요?</span>
          </div>
          <img src="/img/icon-giraffe.svg" alt="기린" class="icon-giraffe"></img>`;

    return `
      <section class="mydrawings-container">
        <h2 class="title">내 작품 보기</h2>
        <div class="drawings">
          ${myDrawingElement}
        </div>
        <a href="/" class="fas fa-3x fa-home home"></a>
      </section>`;
  },

  eventBinding() {
    return null;
  }
});
