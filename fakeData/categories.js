const categories = [
  {
    id: 1,
    name: '기린'
  },
  {
    id: 2,
    name: '이웅모 강사님'
  },
  {
    id: 3,
    name: '도라에몽'
  },
  {
    id: 4,
    name: '또가스'
  },
  {
    id: 5,
    name: '잔망루피'
  }
];

export const getCategories = () => categories;
export const randomIndex = () => Math.floor(Math.random() * categories.length - 0);
export const fintCategoryById = id => categories.find(category => category.id === +id);
