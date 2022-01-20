const categories = [
  {
    id: 1,
    name: '기린'
  },
  {
    id: 2,
    name: 'Ungmo Lee'
  },
  {
    id: 3,
    name: '도라에몽'
  }
];

export const getCategories = () => categories;
export const randomIndex = () => Math.floor(Math.random() * categories.length - 0);
export const fintCategoryById = id => categories.find(category => category.id === +id);
