import { getNickname, getProfile } from './users.js';

let drawings = [
  {
    id: 1,
    userId: 4,
    url: 'images/drawings/canvas1.jpg',
    categoryId: 1,
    likedUserId: [1]
  },
  {
    id: 2,
    userId: 7,
    url: 'images/drawings/canvas2.jpg',
    categoryId: 1,
    likedUserId: [1, 2]
  },
  {
    id: 3,
    userId: 1,
    url: 'images/drawings/canvas3.jpg',
    categoryId: 1,
    likedUserId: [2, 3, 4]
  },
  {
    id: 4,
    userId: 6,
    url: 'images/drawings/canvas4.jpg',
    categoryId: 1,
    likedUserId: [3]
  },
  {
    id: 5,
    userId: 10,
    url: 'images/drawings/canvas5.jpg',
    categoryId: 1,
    likedUserId: [2]
  },
  {
    id: 6,
    userId: 5,
    url: 'images/drawings/canvas6.jpg',
    categoryId: 2,
    likedUserId: [2]
  },
  {
    id: 7,
    userId: 6,
    url: 'images/drawings/canvas7.jpg',
    categoryId: 2,
    likedUserId: [1, 2]
  },
  {
    id: 8,
    userId: 10,
    url: 'images/drawings/canvas8.jpg',
    categoryId: 2,
    likedUserId: [1, 2, 3, 4]
  },
  {
    id: 9,
    userId: 4,
    url: 'images/drawings/canvas9.jpg',
    categoryId: 2,
    likedUserId: []
  },
  {
    id: 10,
    userId: 9,
    url: 'images/drawings/canvas10.jpg',
    categoryId: 2,
    likedUserId: []
  },
  {
    id: 11,
    userId: 11,
    url: 'images/drawings/canvas11.jpg',
    categoryId: 2,
    likedUserId: []
  },
  {
    id: 12,
    userId: 4,
    url: 'images/drawings/canvas12.jpg',
    categoryId: 3,
    likedUserId: [2]
  },
  {
    id: 13,
    userId: 9,
    url: 'images/drawings/canvas13.jpg',
    categoryId: 3,
    likedUserId: [1, 2, 3, 4, 5]
  },
  {
    id: 14,
    userId: 8,
    url: 'images/drawings/canvas14.jpg',
    categoryId: 3,
    likedUserId: [2, 3]
  },
  {
    id: 15,
    userId: 7,
    url: 'images/drawings/canvas15.jpg',
    categoryId: 4,
    likedUserId: [2]
  },
  {
    id: 16,
    userId: 8,
    url: 'images/drawings/canvas16.jpg',
    categoryId: 4,
    likedUserId: [1]
  },
  {
    id: 17,
    userId: 1,
    url: 'images/drawings/canvas17.jpg',
    categoryId: 4,
    likedUserId: [2, 3, 4, 5, 6, 7]
  },
  {
    id: 18,
    userId: 10,
    url: 'images/drawings/canvas18.jpg',
    categoryId: 5,
    likedUserId: [2]
  },
  {
    id: 19,
    userId: 9,
    url: 'images/drawings/canvas19.jpg',
    categoryId: 5,
    likedUserId: [4, 5]
  },
  {
    id: 20,
    userId: 11,
    url: 'images/drawings/canvas20.jpg',
    categoryId: 5,
    likedUserId: [7]
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
  drawings.filter(drawing => drawing.id !== +drawingid);

export const findDrawingByDrawId = (drawingid, drawings = getDrawings()) =>
  drawings.find(drawing => drawing.id === +drawingid);

export const newDrawingsWithUNickName = (drawings, nickName) =>
  drawings.map(drawing => ({
    ...drawing,
    nickname: nickName
  }));

export const newDrawingsWithUserInfo = drawings =>
  drawings.map(drawing => ({
    ...drawing,
    nickname: getNickname(drawing.userId),
    profile: getProfile(drawing.userId)
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
