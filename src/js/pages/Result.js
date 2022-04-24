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

  getHtml({ myDrawing, recentDrawingsWithUserInfo, userId }) {
    const myDrawingElement = [myDrawing]
      .map(
        ({ url }) => `
				<figure>
					<img src="${url}" alt="내 그림" />
				</figure>
				`
      )
      .join('');

    const recentDrawingsElement = recentDrawingsWithUserInfo
      .map(
        drawing => `
					<figure data-id="${drawing.id}">
						<div class="img-container">
							<img src="${drawing.url}" alt="다른 유저 그림" />
						</div>
						<figcaption>
							<img src="${drawing.profile}" alt="${drawing.nickname}" class="profile"/>
							<div class="info-container">
								<span class="nickname">${drawing.nickname}</span>
								<div class="like--group">
									<i class="${drawing.likedUserId.includes(userId) ? 'fas fa-heart' : 'far fa-heart'} like"></i>
									<span>${drawing.likedUserId.length}</span>
								</div>
							</div>
						</figcaption>
				</figure>
				`
      )
      .join('');

    return `
			<section class="result-container">
				${myDrawingElement}
				<a href="/" class="fas fa-3x fa-home home"></a>
				<p>다른 사람들은 어떻게 그렸을까요?</p>
				<div class="drawings">
					${recentDrawingsElement}
				</div>
			</section>`;
  },

  eventBinding(el, userId) {
    const $drawings = el.querySelector('.drawings');

    const renderLikeGroup = (el, likedUserId) => {
      el.innerHTML = `
        <i class="${likedUserId.includes(userId) ? 'fas fa-heart' : 'far fa-heart'} like"></i>
        <span>${likedUserId.length}</span>
      `;
    };

    const toggleLiked = async e => {
      if (!e.target.matches('.like')) return;
      const { id } = e.target.closest('figure').dataset;
      const $likeGroup = e.target.closest('.like--group');
      const { data: likedUserId } = await axios.patch(`/drawings/${id}`, {
        userId
      });

      renderLikeGroup($likeGroup, likedUserId);
    };

    $drawings.addEventListener('click', toggleLiked);
  }
});
