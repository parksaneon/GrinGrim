import axios from 'axios';

export default () => ({
  async getData(query) {
    const [category, drawing] = query.split('&');
    const drawingId = drawing.split('=')[1];
    const categoryName = category.split('=')[1];

    const { data: myDrawing } = await axios.get(`/drawings/${drawingId}`);

    const { data: categoryId } = await axios.get(`/category?category=${categoryName}`);
    const { data: recentDrawingsWithNickname } = await axios.get(`/drawings/category/${categoryId}?sortBy=date`);

    return { data: { myDrawing, recentDrawingsWithNickname } };
  },

  getHtml({ myDrawing, recentDrawingsWithNickname }) {
    return (
      myDrawing
        .map(
          ({ url }) =>
            `
    						<section class="result-container">
    						<figure>
    							<img src="http://localhost:8000/${url}" alt="내 그림" />
    						</figure>
    						<a href="/" class="fas fa-3x fa-home home"></a>
    						<p>다른 사람들은 어떻게 그렸을까요?</p>
    						<div class="drawings">
    						`
        )
        .join('') +
      recentDrawingsWithNickname
        .map(
          drawing =>
            `
    					<figure>
    					<img src="http://localhost:8000/${drawing.url}" alt="다른 유저 그림" />
    					<figcaption>
    						<i class="fas fa-heart like"></i>
    						<span>${drawing.likedUserId.length}</span>
    						<span class="nickname">${drawing.nickname}</span>
    					</figcaption>
    				</figure>
    				`
        )
        .join('') +
      `</div>
          </section>`
    );
  },

  eventBinding() {
    return null;
  }
});

// const displayResult = async e => {
//   e.preventDefault();
//   if (!e.target.matches('.close-popup')) return;
//   try {
//     const { data: drawingId } = await uploadCanvas();
//     const { data: myDrawing } = await axios.get(`http://localhost:8000/drawings/${drawingId.id}`);
//     const { data: recentDrawingsWithNickname } = await axios.get(
//       `http://localhost:8000/drawings/category/${categoryId}?limit=4`
//     );
//     $root.innerHTML =
//       myDrawing
//         .map(
//           ({ url }) =>
//             `
// 						<section class="result-container">
// 						<figure>
// 							<img src="http://localhost:8000/${url}" alt="내 그림" />
// 						</figure>
// 						<a href="/" class="fas fa-3x fa-home home"></a>
// 						<p>다른 사람들은 어떻게 그렸을까요?</p>
// 						<div class="drawings">
// 						`
//         )
//         .join('') +
//       recentDrawingsWithNickname
//         .map(
//           drawing =>
//             `
// 					<figure>
// 					<img src="http://localhost:8000/${drawing.url}" alt="다른 유저 그림" />
// 					<figcaption>
// 						<i class="fas fa-heart like"></i>
// 						<span>${drawing.likedUserId.length}</span>
// 						<span class="nickname">${drawing.nickname}</span>
// 					</figcaption>
// 				</figure>
// 				`
//         )
//         .join('') +
//       `</div>
//       </section>`;
//   } catch (error) {
//     console.error();
//   }
// };
