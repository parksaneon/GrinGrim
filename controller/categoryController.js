import { fintCategoryById, getCategories, randomIndex } from '../fakeData/categories.js';

export const sendCategory = (req, res) => {
  res.send(getCategories());
};

export const sendCategoryName = (req, res) => {
  const { id } = req.params;
  const { name } = fintCategoryById(id);
  res.send(`${name}`);
};

export const sendRandomCategory = (req, res) => {
  res.send(getCategories()[randomIndex()]);
};

export const sendCategoryLength = (req, res) => {
  res.send(`${getCategories().length}`);
};
