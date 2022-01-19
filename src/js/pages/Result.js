import axios from 'axios';

export default () => ({
  async getData(query) {
    const [category, drawing] = query.split('&');
    const drawingId = drawing.split('=')[1];
    const categoryId = category.split('=')[1];

    const { data: myDrawing } = await axios.get(`/drawings/${drawingId}`);
    const { data: recentDrawingsWithUserInfo } = await axios.get(
      `/drawings/category/${categoryId}?sortBy=date&drawingId!=${drawingId}`
    );
    return { data: { myDrawing, recentDrawingsWithUserInfo } };
  },

  getHtml({ myDrawing, recentDrawingsWithUserInfo }) {
    const USER_ID = 1;
    return (
      [myDrawing]
        .map(
          ({ url }) =>
            `
    						<section class="result-container">
    						<figure>
    							<img src="${url}" alt="내 그림" />
    						</figure>
    						<a href="/" class="fas fa-3x fa-home home"></a>
    						<p>다른 사람들은 어떻게 그렸을까요?</p>
    						<div class="drawings">
    						`
        )
        .join('') +
      recentDrawingsWithUserInfo
        .map(
          drawing =>
            `
    					<figure data-id="${drawing.id}">
							<div class="img-container">
    						<img src="${drawing.url}" alt="다른 유저 그림" />
							</div>
							<figcaption>
								<img src="${drawing.profile}" class="profile"/>
								<div class="info-container">
									<span class="nickname">${drawing.nickname}</span>
									<div class="like--group">
									<i class="${drawing.likedUserId.includes(USER_ID) ? 'fas fa-heart' : 'far fa-heart'} like"></i>
										<span>${drawing.likedUserId.length}</span>
									</div>
								</div>
							</figcaption>
    				</figure>
    				`
        )
        .join('') +
      `</div>
          </section>`
    );
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
