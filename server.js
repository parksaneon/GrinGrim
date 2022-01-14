import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import authRouter from './router/authRouter.js';
import path from 'path';
import history from 'connect-history-api-fallback';

dotenv.config();

// import userRouter from './router/userRouter.js';

// const __dirname = path.resolve();

// const app = express();
// const port = 8000;

const corsOption = {
  origin: '*', // 접근 권한을 부여하는 도메인
  optionsSuccessStatus: 200, // 응답 상태 200으로 설정
  credentials: true // 응답 헤더에 Access-Control-Allow-Credentials 추가
};

app.use(express.static('public'));
app.use(cors(corsOption));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/auth', authRouter);
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
