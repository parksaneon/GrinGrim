import axios from 'axios';

export default () => ({
  async getData() {
    const USER_ID = 1;
    const { data: mydrawings } = await axios.get(`/drawings/userid/${USER_ID}`);
    const categoryNamePromise = mydrawings.map(({ categoryId }) => axios.get(`/category/${categoryId}/name`));

    const categoryNames = await Promise.all(categoryNamePromise);

    let mydrawingsWithCategoryName = [];

    mydrawings.forEach((mydrawing, index) => {
      mydrawingsWithCategoryName = [
        ...mydrawingsWithCategoryName,
        { ...mydrawing, categoryName: categoryNames[index].data }
      ];
    });

    return { data: mydrawingsWithCategoryName };
  },

  getHtml(mydrawings) {
    return (
      `<section class="mydrawings-container">
		<h2 class="title">내 작품 보기</h2>
		<div class="drawings">` +
      mydrawings
        .map(
          ({ categoryName, likedUserId, url }) => `
					<figure>
					<div class="img-container">
						<img src="${url}">
					</div>
					<figcaption>
					<p>주제: ${categoryName}</p>
					<i class="fas fa-heart like"></i>
					<span>${likedUserId.length}</span>
					</figcaption>
					</figure>
			`
        )
        .join('') +
      `</div>

		<a href="/" class="fas fa-3x fa-home home"></a>
		</section>`
    );
  },

  // drawings가 0일 경우
  // <div class="message">
  // 	<span>이런!</span>
  // 	<span>아직 활동 내역이 없어요.</span>
  // 	<span>나만의 작품을 만들어 볼까요?</span>

  // 	</div>
  // 	<img src="/img/icon-giraffe.svg" alt="기린" class="icon-giraffe"></img>

  eventBinding() {
    return null;
  }
});
