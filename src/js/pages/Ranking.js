import axios from 'axios';

export default () => ({
  async getData(query) {
    query = query || 'categoryId=1';
    const categoryId = query.split('=')[1];
    const { data: categoryName } = await axios.get(`category/${categoryId}/name`);
    const { data: ranking } = await axios.get(`drawings/category/${categoryId}?sortBy=like`);
    return { data: { categoryName, ranking } };
  },

  getHtml({ ranking, categoryName }) {
    return (
      `<section class="ranking-container">
				<h2 class="category-title">주제: ${categoryName}</h2>
				<div class="drawings">` +
      ranking
        .map(
          ({ likedUserId, url, nickname }) => `
					<figure>
					<div class="img-container">
						<img src="${url}">
					</div>
					<figcaption>
					
					<i class="fas fa-heart like"></i>
          <span>${likedUserId.length}</span>
					<span class="nickname">${nickname}</span>
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

  eventBinding() {
    return null;
  }
});
