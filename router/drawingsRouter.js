import express from 'express';
import multer from 'multer';
import {
  addDrawing,
  editDrawingById,
  sendDrawingsByCategory,
  sendDrawingsByCategoryId,
  sendDrawingsByDrwaingId,
  sendDrawingsByUserId
} from '../controller/drawingsController.js';

const drawingsRouter = express.Router();

const upload = multer({
  limits: { fileSize: 5 * 1024 * 1024 },
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'public/img/drawings/');
    },
    filename(req, file, cb) {
      cb(null, file.originalname);
    }
  })
});

drawingsRouter.get('/', sendDrawingsByCategory);
drawingsRouter.get('/:drawingid', sendDrawingsByDrwaingId);
drawingsRouter.get('/userid/:userid', sendDrawingsByUserId);
drawingsRouter.get('/category/:categoryid', sendDrawingsByCategoryId);
drawingsRouter.post('/', upload.single('file'), addDrawing);
drawingsRouter.patch('/:id', editDrawingById);

export default drawingsRouter;
