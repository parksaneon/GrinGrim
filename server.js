import express from 'express';
import cors from 'cors';
import multer from 'multer';
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

let drawings = [
  {
    id: 1,
    userid: 100,
    url: '/images/drawings/canvas1.png',
    categoryId: 1,
    likedUserId: [1, 2, 3, 4]
  },

  {
    id: 2,
    userid: 10,
    url: '/images/drawings/canvas2.png',
    categoryId: 1,
    likedUserId: [2, 3]
  },
  {
    id: 3,
    userid: 100,
    url: '/images/drawings/canvas3.png',
    categoryId: 2,
    likedUserId: []
  },

  {
    id: 4,
    userid: 10,
    url: '/images/drawings/canvas4.png',
    categoryId: 2,
    likedUserId: [1]
  },
  {
    id: 5,
    userid: 100,
    url: '/images/drawings/canvas5.png',
    categories: 2,
    likedUserId: []
  },
  {
    id: 6,
    userid: 10,
    url: '/images/drawings/test.jpeg',
    categoryId: 1,
    likedUserId: [2, 3]
  }
];

const categories = [
  {
    id: 1,
    name: '기린'
  },
  {
    id: 2,
    name: '퇴근'
  }
];

app.use('/images', express.static('images'));
app.use(express.urlencoded({ extended: true }));
const corsOption = {
  origin: 'http://localhost:9000', // 접근 권한을 부여하는 도메인
  method: ['GET', 'POST', 'DELETE', 'HEAD', 'PUT', 'PATCH'],
  optionsSuccessStatus: 200, // 응답 상태 200으로 설정
  credentials: true // 응답 헤더에 Access-Control-Allow-Credentials 추가
};
app.use(cors(corsOption));
app.use(express.json());
const upload = multer({
  limits: { fileSize: 5 * 1024 * 1024 },
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'images/drawings/');
    },
    filename(req, file, cb) {
      cb(null, file.originalname);
    }
  })
});

const generateId = data => (data[data.length - 1]?.id || 0) + 1;
const getNickname = userid => users.find(user => user.id === +userid).nickname;

app.get('/drawings/:drawingid', (req, res) => {
  const { drawingid } = req.params;
  res.send(drawings.filter(({ id }) => id === +drawingid));
});

app.get('/drawings/category/:categoryid', (req, res) => {
  const { categoryid } = req.params;
  const { limit } = req.query;
  const drawingsFilterCategory = drawings.filter(drawing => drawing.categoryId === +categoryid);
  const recentDrawings = drawingsFilterCategory.sort((drawing1, drawing2) => drawing2.id - drawing1.id).slice(0, limit);
  const recentDrawingsWithNickname = recentDrawings.map(drawing => ({
    ...drawing,
    nickname: getNickname(drawing.userid)
  }));
  res.send(recentDrawingsWithNickname);
});

app.post('/drawings', upload.single('file'), (req, res) => {
  console.log('UPLOAD SUCCESS!', req.file);
  const id = generateId(drawings);
  drawings = [
    ...drawings,
    {
      id,
      userid: 1,
      url: req.file.destination + req.file.originalname,
      categoryId: 2,
      likedUserId: []
    }
  ];
  res.cookie('drawingId', id);
  res.send();
});

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

app.get('/categories', (req, res) => {
  const randomIndex = Math.floor(Math.random() * (categories.length - 0) + 0);
  res.cookie('categoryId', categories[randomIndex].id);
  res.send(categories[randomIndex].name);
});

app.listen(port, () => {
  console.log('hi2');
});
