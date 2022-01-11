import express from 'express';
import cors from 'cors';
import userRouter from './router/userRouter.js';

const app = express();
const port = 8000;

const users = [
  {
    id: 100,
    nickname: '최한나'
  },
  {
    id: 10,
    nickname: '박상언'
  }
];

const drawings = [
  {
    id: 1,
    userid: 100,
    url: '/images/drawings/test.jpeg',
    category: '정신',
    likedUserId: [1, 2, 3, 4]
  },
  {
    id: 2,
    userid: 10,
    url: '/images/drawings/test.jpeg',
    category: '정신',
    likedUserId: [1, 2, 5]
  },
  {
    id: 3,
    userid: 10,
    url: '/images/drawings/test.jpeg',
    category: '잃음',
    likedUserId: [1, 2, 3, 4, 5]
  }
];

// app.use(express.static('public'));
app.use('/images', express.static('images'));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

const getNickname = userid => users.find(user => user.id === +userid).nickname;

app.get('/drawings/:userid', (req, res) => {
  const { userid } = req.params;
  const drawingsFilterByUserId = drawings.filter(drawing => drawing.userid === +userid);
  const drawingsWithNickname = drawingsFilterByUserId.map(drawing => ({
    ...drawing,
    nickname: getNickname(drawing.userid)
  }));
  res.send(drawingsWithNickname);
});

app.get('/drawings', (req, res) => {
  const { category } = req.query;

  const drawingsFilterByCategory = drawings.filter(drawing => drawing.category === category);
  const drawingsWithNickname = drawingsFilterByCategory.map(drawing => ({
    ...drawing,
    nickname: getNickname(drawing.userid)
  }));
  const sortedDrawings = drawingsWithNickname.sort(
    (drawing1, drawing2) => drawing2.likedUserId.length - drawing1.likedUserId.length
  );
  res.send(sortedDrawings);
});

app.listen(port, () => {
  console.log('hi2');
});
