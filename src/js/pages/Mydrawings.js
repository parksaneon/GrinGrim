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
    return mydrawings
      .map(
        ({ id, categoryName, likedUserId, url, nickname }) => `
            <img src="${url}">
            <div>아이디: ${id}</div>
            <div>카테고리: ${categoryName}</div>
            <div>좋아요: ${likedUserId.length}</div>
            <div>닉네임: ${nickname}</div>
      `
      )
      .join('');
  },

  eventBinding() {
    return null;
  }
});
