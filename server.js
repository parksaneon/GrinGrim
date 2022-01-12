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

const categories = [
  {
    id: 1,
    name: '기린'
  },
  {
    id: 2,
    name: '퇴근'
  },
  {
    id: 3,
    name: '고양이'
  },
  {
    id: 4,
    name: '커피'
  },
  {
    id: 5,
    name: '마블'
  }
];

app.use('/images', express.static('images'));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
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

app.post('/drawings', upload.single('file'), (req, res) => {
  console.log('UPLOAD SUCCESS!', req.file);
  drawings = [
    ...drawings,
    {
      id: generateId(drawings),
      userid: 1,
      url: req.file.destination + req.file.originalname,
      categoryid: 1,
      likedUserId: []
    }
  ];
});

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

app.get('/categories', (req, res) => {
  const randomIndex = Math.floor(Math.random() * (categories.length - 0) + 0);
  res.json({ subject: categories[randomIndex].name });
});

app.listen(port, () => {
  console.log('hi2');
});
