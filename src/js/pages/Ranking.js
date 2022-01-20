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
    const USER_ID = 1;
    const rankingElement = ranking
      .map(
        ({ id, likedUserId, url, nickname, profile }) => `
			<figure data-id="${id}">
				<div class="img-container">
					<img src="${url}">
				</div>
				<figcaption>
					<img src="${profile}" class="profile"/>
					<div class="info-container">
						<span class="nickname">${nickname}</span>
						<div class="like--group">
							<i class="${likedUserId.includes(USER_ID) ? 'fas fa-heart' : 'far fa-heart'} like"></i>
							<span>${likedUserId.length}</span>
						</div>
					</div>
				</figcaption>
			</figure>
			`
      )
      .join('');

    return `
			<section class="ranking-container">
				<h2 class="category-title">주제: ${categoryName}</h2>
				<div class="drawings">
					${rankingElement}
				</div>
				<a href="/" class="fas fa-3x fa-home home"></a>
			</section>`;
  },

  eventBinding(el) {
    const USER_ID = 1;
    const likebuttonGroups = [...el.querySelectorAll('.like--group')];

    const renderLikeGroup = (el, likedUserId) => {
      el.innerHTML = `
        <i class="${likedUserId.includes(USER_ID) ? 'fas fa-heart' : 'far fa-heart'} like"></i>
        <span>${likedUserId.length}</span>
      `;
    };

    const toggleLiked = async e => {
      if (!e.target.matches('.like')) return;
      const { id } = e.target.closest('figure').dataset;
      const $likeGroup = e.target.closest('.like--group');
      const { data: likedUserId } = await axios.patch(`/drawings/${id}`, {
        userId: USER_ID
      });

      renderLikeGroup($likeGroup, likedUserId);
    };

    likebuttonGroups.forEach(likebutton => {
      likebutton.onclick = toggleLiked;
    });
  }
});
