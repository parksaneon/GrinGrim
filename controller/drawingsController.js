import {
  addNewDrawing,
  newDrawingsWithDNickName,
  findDrawingsByCategory,
  findDrawingById,
  setDrawingLikedById,
  findDrawingsByDrawId,
  drawingsSortedByDate,
  drawingsSortedByLiked,
  generateDrawingId
} from '../fakeData/drawings.js';

export const sendDrawingsByCategory = (req, res) => {
  const { category } = req.query;
  res.send(drawingsSortedByLiked(newDrawingsWithDNickName(findDrawingsByCategory(category))));
};

export const sendDrawingsByDrwaingId = (req, res) => {
  const { drawingid } = req.params;
  res.send(findDrawingsByDrawId(drawingid));
};

export const sendDrawingsByUserId = (req, res) => {
  const { drawingid } = req.params;
  res.send(findDrawingsByDrawId(drawingid));
};

export const sendDrawingsByCategoryId = (req, res) => {
  const { categoryid } = req.params;
  const { drawingId, sortBy } = req.query;
  const drawingsFilterByDrawingId = findDrawingsByDrawId(drawingId, findDrawingsByCategory(categoryid));
  // drawing.id !== +drawingId
  const drawingsSortedBy =
    sortBy === 'date'
      ? drawingsSortedByDate(drawingsFilterByDrawingId)
      : drawingsSortedByLiked(drawingsFilterByDrawingId);

  res.send(newDrawingsWithDNickName(drawingsSortedBy));
};

export const addDrawing = (req, res) => {
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
};

export const editDrawingById = (req, res) => {
  const { id } = req.params;
  const { userid } = req.body;
  const { likedUserId } = findDrawingById(id);

  setDrawingLikedById(id, userid);
  res.send(likedUserId);
};
