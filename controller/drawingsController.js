import {
  addNewDrawing,
  newDrawingsWithDNickName,
  findDrawingsByCategory,
  findDrawingById,
  setDrawingLikedById,
  findDrawingsByDrawId,
  findDrawingsByDiffDrawId,
  drawingsSortedByDate,
  drawingsSortedByLiked,
  generateDrawingId,
  findDrawingByDrawId
} from '../fakeData/drawings.js';

export const sendDrawingsByCategory = (req, res) => {
  const { category } = req.query;
  res.send(drawingsSortedByLiked(newDrawingsWithDNickName(findDrawingsByCategory(category))));
};

export const sendDrawingsByDrwaingId = (req, res) => {
  const { drawingid } = req.params;
  res.send(findDrawingByDrawId(drawingid));
};

export const sendDrawingsByUserId = (req, res) => {
  const { userid } = req.params;
  res.send(findDrawingsByDrawId(userid));
};

export const sendDrawingsByCategoryId = (req, res) => {
  const { categoryid } = req.params;
  const { drawingId, sortBy } = req.query;
  const drawingsFilterByDrawingId = findDrawingsByDiffDrawId(drawingId, findDrawingsByCategory(categoryid));

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
    userId: +userId,
    url: req.file.destination + req.file.originalname,
    categoryId,
    likedUserId: []
  };

  addNewDrawing(newDrawing);
  res.send({ id });
};

export const editDrawingById = (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  setDrawingLikedById(id, userId);

  const { likedUserId } = findDrawingById(id);
  res.send(likedUserId);
};
