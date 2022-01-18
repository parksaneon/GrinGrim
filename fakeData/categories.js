const categories = [
  {
    id: 1,
    name: '기린'
  },
  {
    id: 2,
    name: '퇴근'
  }
];

export const getCategories = () => categories;
export const randomIndex = () => Math.floor(Math.random() * categories.length - 0);
export const fintCategoryById = id => categories.find(category => category.id === +id);
