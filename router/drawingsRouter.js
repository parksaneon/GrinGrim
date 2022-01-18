import express from 'express';
import multer from 'multer';
import {
  addNewDrawing,
  newDrawingsWithUNickName,
  newDrawingsWithDNickName,
  findDrawingsByCategory,
  findDrawingById,
  setDrawingLikedById,
  findDrawingsById,
  findDrawingsByDrawId,
  drawingsSortedByDate,
  drawingsSortedByLiked,
  generateDrawingId
} from '../fakeData/drawings.js';
import { getNickname } from '../fakeData/users.js';

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

drawingsRouter.get('/', (req, res) => {
  const { category } = req.query;
  res.send(drawingsSortedByLiked(newDrawingsWithDNickName(findDrawingsByCategory(category))));
});

drawingsRouter.get('/:drawingid', (req, res) => {
  const { drawingid } = req.params;
  res.send(findDrawingsByDrawId(drawingid));
});

drawingsRouter.get('/userid/:userid', (req, res) => {
  const { userid } = req.params;
  res.send(newDrawingsWithUNickName(findDrawingsById(userid), getNickname(userid)));
});

drawingsRouter.get('/category/:categoryid', (req, res) => {
  const { categoryid } = req.params;
  const { drawingId, sortBy } = req.query;
  const drawingsFilterByDrawingId = findDrawingsByDrawId(drawingId, findDrawingsByCategory(categoryid));
  // drawing.id !== +drawingId
  const drawingsSortedBy =
    sortBy === 'date'
      ? drawingsSortedByDate(drawingsFilterByDrawingId)
      : drawingsSortedByLiked(drawingsFilterByDrawingId);

  res.send(newDrawingsWithDNickName(drawingsSortedBy));
});

drawingsRouter.post('/', upload.single('file'), (req, res) => {
  console.log('UPLOAD SUCCESS!', req.file);
  const id = generateDrawingId();
  const { userId, categoryId } = req.body;
  const newDrawing = {
    id,
    userId,
    url: req.file.destination + req.file.originalname,
    categoryId,
    likedUserId: []
  };

  addNewDrawing(newDrawing);
  res.send({ id });
});

drawingsRouter.patch('/:id', (req, res) => {
  const { id } = req.params;
  const { userid } = req.body;
  const { likedUserId } = findDrawingById(id);

  setDrawingLikedById(id, userid);
  res.send(likedUserId);
});

export default drawingsRouter;
