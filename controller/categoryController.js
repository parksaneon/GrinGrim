import { fintCategoryById, getCategories, randomIndex } from '../fakeData/categories.js';

export const sendCategory = (req, res) => {
  const categoryName = req.query.category;
  res.send(`${fintCategoryById(categoryName).id}`);
};

export const sendCategoryName = (req, res) => {
  const { id } = req.params;
  const { name } = fintCategoryById(id);

  res.send(`${name}`);
};

export const sendRandomCategory = (req, res) => {
  res.send(getCategories()[randomIndex()]);
};
