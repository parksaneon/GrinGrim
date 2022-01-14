import express from 'express';
import cors from 'cors';
import path from 'path';
import history from 'connect-history-api-fallback';

// import userRouter from './router/userRouter.js';

// const __dirname = path.resolve();

// const app = express();
// const port = 8000;

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
    categoryid: 1,
    likedUserId: [1, 2, 3, 4]
  },
  {
    id: 2,
    userid: 10,
    url: '/images/drawings/test.jpeg',
    categoryid: 1,
    likedUserId: [1, 2, 5]
  },
  {
    id: 3,
    userid: 10,
    url: '/images/drawings/test.jpeg',
    categoryid: 2,
    likedUserId: [1, 2, 3, 4, 5]
  }
];

const categories = [
  {
    id: 1,
    name: 'turtle'
  },
  {
    id: 2,
    name: 'rabbit'
  }
];

// // app.use(express.static('public'));
// app.use('/images', express.static('images'));
// app.use(express.urlencoded({ extended: true }));
// app.use(cors());
// app.use(express.json());
// // app.use(
// //   history({
// //     rewrites: [
// //       { from: '/mydrawings', to: `/index.html` },
// //       // { from: '/ranking/*', to: `/drawings/category/1` }
// //       {
// //         from: '/ranking/*',
// //         to: ({ parsedUrl }) => {
// //           const categoryId = parsedUrl.path.split('/').pop();
// //           return `/drawings/category/${categoryId}`;
// //         }
// //       }
// //     ]
// //   })
// // );

// app.get('/users/:userid/nickname', (req, res) => {
//   const { userid } = req.params;
//   res.send(users.find(user => user.id === +userid).nickname);
// });

// app.get('/drawings/userid/:userid', (req, res) => {
//   const { userid } = req.params;
//   const drawingsFilterByUserId = drawings.filter(drawing => drawing.userid === +userid);
//   res.send(drawingsFilterByUserId);
// });

// app.get('/drawings/category/:categoryid', (req, res) => {
//   const { categoryid } = req.params;
//   const drawingsFilterByCategoryId = drawings.filter(drawing => drawing.categoryid === +categoryid);
//   const drawingsSortedByLiked = drawingsFilterByCategoryId.sort(
//     (drawing1, drawing2) => drawing2.likedUserId.length - drawing1.likedUserId.length
//   );
//   res.send(drawingsSortedByLiked);
// });

// const getNickname = userid => users.find(user => user.id === +userid).nickname;

// app.get('/mydrawings', (req, res) => {
//   // const { userid } = req.params;
//   const userid = 10;
//   const drawingsFilterByUserId = drawings.filter(drawing => drawing.userid === +userid);

//   const nickname = getNickname(userid);
//   const drawingsWithNickname = drawingsFilterByUserId.map(drawing => ({ ...drawing, nickname }));
//   res.send(drawingsWithNickname);
// });

// app.get('/mydrawings/:userid', (req, res) => {
//   const { userid } = req.params;
//   const drawingsFilterByUserId = drawings.filter(drawing => drawing.userid === +userid);

//   const nickname = getNickname(userid);
//   const drawingsWithNickname = drawingsFilterByUserId.map(drawing => ({ ...drawing, nickname }));
//   res.send(drawingsWithNickname);
// });

// app.get('*', (req, res) => {
//   console.log(__dirname);
//   res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
// });

// app.listen(port, () => {
//   console.log('hi2');
// });

// server.js
// express server
// express 모듈 불러오기

// express 사용
const app = express();

const __dirname = path.resolve();
app.use('/static', express.static(path.resolve(__dirname, '/', 'static')));
app.use(cors());
app.use('/images', express.static('images'));

const getNickname = userid => users.find(user => user.id === +userid).nickname;

app.get('/category', (req, res) => {
  const categoryName = req.query.category;
  const categoryId = categories.find(category => category.name === categoryName).id;

  res.send(`${categoryId}`);
});

app.get('/drawings/userid/:userid', (req, res) => {
  const { userid } = req.params;
  const drawingsFilterByUserId = drawings.filter(drawing => drawing.userid === +userid);

  const nickname = getNickname(userid);
  const drawingsWithNickname = drawingsFilterByUserId.map(drawing => ({ ...drawing, nickname }));
  res.send(drawingsWithNickname);
});

app.get('/drawings/category/:categoryid', (req, res) => {
  const { categoryid } = req.params;
  const drawingsFilterByCategoryId = drawings.filter(drawing => drawing.categoryid === +categoryid);
  const drawingsSortedByLiked = drawingsFilterByCategoryId.sort(
    (drawing1, drawing2) => drawing2.likedUserId.length - drawing1.likedUserId.length
  );

  const drawingsWithNickname = drawingsSortedByLiked.map(drawing => ({
    ...drawing,
    nickname: getNickname(drawing.userid)
  }));

  res.send(drawingsWithNickname);
});

app.get('/*', (req, res) => {
  res.sendFile(path.resolve('/', 'index.html'));
});

// port 생성 서버 실행
app.listen(8000, () => console.log('Server running ....'));
