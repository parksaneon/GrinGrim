import express from 'express';
import cors from 'cors';
// import userRouter from './router/userRouter.js';

import multer from 'multer';

const app = express();
const port = 8000;

app.use('/images', express.static('images'));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

let drawings = [];

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

app.listen(port, () => {
  console.log('hi2');
});
