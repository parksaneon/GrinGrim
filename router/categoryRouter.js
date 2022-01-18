import express from 'express';
import { sendCategory, sendCategoryName, sendRandomCategory } from '../controller/categoryController.js';

const categoryRouter = express.Router();

categoryRouter.get('/', sendCategory);
categoryRouter.get('/:id/name', sendCategoryName);
categoryRouter.get('/random', sendRandomCategory);

export default categoryRouter;
