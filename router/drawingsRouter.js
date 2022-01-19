import express from 'express';
import {
  addDrawing,
  editDrawingById,
  sendDrawingsByCategory,
  sendDrawingsByCategoryId,
  sendDrawingsByDrwaingId,
  sendDrawingsByUserId
} from '../controller/drawingsController.js';
import { drawingUpload } from '../middleware/fileUpload.js';

const drawingsRouter = express.Router();

drawingsRouter.get('/', sendDrawingsByCategory);
drawingsRouter.get('/:drawingid', sendDrawingsByDrwaingId);
drawingsRouter.get('/userid/:userid', sendDrawingsByUserId);
drawingsRouter.get('/category/:categoryid', sendDrawingsByCategoryId);
drawingsRouter.post('/', drawingUpload.single('file'), addDrawing);
drawingsRouter.patch('/:id', editDrawingById);

export default drawingsRouter;
