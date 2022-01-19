import { getNickname } from './users.js';

let drawings = [
  {
    id: 1,
    userId: 1,
    url: 'images/drawings/canvas1.png',
    categoryId: 1,
    likedUserId: [1, 2, 3, 4]
  },

  {
    id: 2,
    userId: 1,
    url: 'images/drawings/canvas2.png',
    categoryId: 1,
    likedUserId: [2, 3]
  },
  {
    id: 3,
    userId: 1,
    url: 'images/drawings/canvas3.png',
    categoryId: 1,
    likedUserId: []
  },

  {
    id: 4,
    userId: 2,
    url: 'images/drawings/canvas4.png',
    categoryId: 2,
    likedUserId: [1]
  },
  {
    id: 5,
    userId: 2,
    url: 'images/drawings/canvas5.png',
    categoryId: 2,
    likedUserId: []
  },
  {
    id: 6,
    userId: 2,
    url: 'images/drawings/canvas6.png',
    categoryId: 2,
    likedUserId: [2, 3]
  }
];

const getDrawings = () => drawings;
const toggleUserId = (likedUserId, userId) =>
  likedUserId.includes(userId) ? likedUserId.filter(id => id !== +userId) : [...likedUserId, +userId];

export const generateDrawingId = () => (drawings[drawings.length - 1]?.id || 0) + 1;
export const findDrawingsById = userId => drawings.filter(drawing => drawing.userId === +userId);
export const findDrawingsByCategory = categoryId => drawings.filter(drawing => drawing.categoryId === +categoryId);
export const findDrawingById = id => drawings.find(drawing => drawing.id === +id);

export const findDrawingsByDrawId = (drawingid, drawings = getDrawings()) =>
  drawings.filter(drawing => drawing.userId === +drawingid);

export const findDrawingsByDiffDrawId = (drawingid, drawings = getDrawings()) =>
  drawings.filter(drawing => drawing.userId !== +drawingid);

export const findDrawingByDrawId = (drawingid, drawings = getDrawings()) =>
  drawings.find(drawing => drawing.id === +drawingid);

export const newDrawingsWithUNickName = (drawings, nickName) =>
  drawings.map(drawing => ({
    ...drawing,
    nickname: nickName
  }));

export const newDrawingsWithDNickName = drawings =>
  drawings.map(drawing => ({
    ...drawing,
    nickname: getNickname(drawing.userId)
  }));

export const drawingsSortedByLiked = drawings =>
  drawings.sort((drawing1, drawing2) => drawing2.likedUserId.length - drawing1.likedUserId.length);

export const drawingsSortedByDate = drawings => drawings.sort((drawing1, drawing2) => drawing2.id - drawing1.id);

export const addNewDrawing = newDrawing => {
  drawings = [...drawings, newDrawing];
};

export const setDrawingLikedById = (id, userId) => {
  drawings = drawings.map(drawing =>
    drawing.id === +id ? { ...drawing, likedUserId: toggleUserId(drawing.likedUserId, userId) } : drawing
  );
};
