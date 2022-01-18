import express from 'express';
import { fintCategoryById, randomIndex } from '../fakeData/categories.js';

const categoryRouter = express.Router();

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

categoryRouter.get('/', (req, res) => {
  const categoryName = req.query.category;
  res.send(`${fintCategoryById(categoryName).id}`);
});

categoryRouter.get('/:id/name', (req, res) => {
  const { id } = req.params;
  const { name } = fintCategoryById(id);

  res.send(`${name}`);
});

categoryRouter.get('/random', (req, res) => {
  res.send(categories[randomIndex()]);
});

export default categoryRouter;
