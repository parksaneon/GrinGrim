import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

import authRouter from './router/authRouter.js';
import isAuth from './middleware/auth.js';
import drawingsRouter from './router/drawingsRouter.js';
import categoryRouter from './router/categoryRouter.js';

dotenv.config();

// const __dirname = path.resolve();

const app = express();
const port = 8000;

const corsOption = {
  origin: 'http://localhost:9000', // 접근 권한을 부여하는 도메인 http://localhost:9000/
  method: ['GET', 'POST', 'DELETE', 'HEAD', 'PUT', 'PATCH'],
  optionsSuccessStatus: 200, // 응답 상태 200으로 설정
  credentials: true // 응답 헤더에 Access-Control-Allow-Credentials 추가
};

app.use(cors(corsOption));
app.use(express.static('public'));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/images', express.static('images'));

app.use('/auth', authRouter);
app.use('/category', categoryRouter);
app.use('/drawings', drawingsRouter);

app.get('/', isAuth, (req, res) => {
  console.log(req.userId);
  res.json({ isLogin: true });
});

// port 생성 서버 실행
app.listen(port, () => {
  console.log('Server running ....');
});

// app.get('/category', (req, res) => {
//   const categoryName = req.query.category;
//   const categoryId = categories.find(category => category.name === categoryName).id;
//   res.send(`${categoryId}`);
// });

// const upload = multer({
//   limits: { fileSize: 5 * 1024 * 1024 },
//   storage: multer.diskStorage({
//     destination(req, file, cb) {
//       cb(null, 'images/drawings/');
//     },
//     filename(req, file, cb) {
//       cb(null, file.originalname);
//     }
//   })
// });

// const generateId = data => (data[data.length - 1]?.id || 0) + 1;
// const getNickname = userid => users.find(user => user.id === +userid).nickname;

// app.get('/drawings/:drawingid', (req, res) => {
//   const { drawingid } = req.params;
//   res.send(drawings.filter(({ id }) => id === +drawingid));
// });

// const drawingsSortedByLiked = drawings =>
//   drawings.sort((drawing1, drawing2) => drawing2.likedUserId.length - drawing1.likedUserId.length);

// const drawingsSortedByDate = drawings => drawings.sort((drawing1, drawing2) => drawing2.id - drawing1.id);

// app.get('/drawings/category/:categoryid', (req, res) => {
//   const { categoryid } = req.params;
//   const { sortBy } = req.query;
//   const drawingsFilterByCategoryId = drawings.filter(drawing => drawing.categoryId === +categoryid);
//   // drawing.id !== +drawingId
//   const drawingsSortedBy =
//     sortBy === 'date'
//       ? drawingsSortedByDate(drawingsFilterByCategoryId)
//       : drawingsSortedByLiked(drawingsFilterByCategoryId);
//   const drawingsWithNickname = drawingsSortedBy.map(drawing => ({
//     ...drawing,
//     nickname: getNickname(drawing.userId)
//   }));
//   res.send(drawingsWithNickname);
// });

// app.get('/drawings', (req, res) => {
//   const { category } = req.query;

//   const drawingsFilterByCategory = drawings.filter(drawing => drawing.category === category);
//   const drawingsWithNickname = drawingsFilterByCategory.map(drawing => ({
//     ...drawing,
//     nickname: getNickname(drawing.userId)
//   }));
//   const sortedDrawings = drawingsWithNickname.sort(
//     (drawing1, drawing2) => drawing2.likedUserId.length - drawing1.likedUserId.length
//   );
//   res.send(sortedDrawings);
// });

// app.post('/drawings', upload.single('file'), (req, res) => {
//   console.log('UPLOAD SUCCESS!', req.file);
//   const id = generateId(drawings);
//   const { categoryId, userId } = req.body;
//   drawings = [
//     ...drawings,
//     {
//       id,
//       userId,
//       url: req.file.destination + req.file.originalname,
//       categoryId,
//       likedUserId: []
//     }
//   ];
//   res.send({ id });
// });

// app.get('/category/random', (req, res) => {
//   const randomIndex = Math.floor(Math.random() * categories.length - 0);
//   res.send(categories[randomIndex]);
// });

// app.get('/drawings/userid/:userid', (req, res) => {
//   const { userid } = req.params;
//   const drawingsFilterByUserId = drawings.filter(drawing => drawing.userId === +userid);

//   const nickname = getNickname(userid);
//   const drawingsWithNickname = drawingsFilterByUserId.map(drawing => ({ ...drawing, nickname }));
//   res.send(drawingsWithNickname);
// });

// app.get('/category/:id/name', (req, res) => {
//   const { id } = req.params;

//   const drawingsWithNickname = drawingsSortedByLiked.map(drawing => ({
//     ...drawing,
//     nickname: getNickname(drawing.userId)
//   }));
//   const { name } = categories.find(category => category.id === +id);

//   res.send(`${name}`);
// });

// app.patch('/drawings/:id', (req, res) => {
//   const { id } = req.params;
//   const { userId } = req.body;

//   const toggleUserId = (likedUserId, userId) =>
//     likedUserId.includes(userId) ? likedUserId.filter(id => id !== +userId) : [...likedUserId, +userId];

//   drawings = drawings.map(drawing =>
//     drawing.id === +id ? { ...drawing, likedUserId: toggleUserId(drawing.likedUserId, userId) } : drawing
//   );

//   const { likedUserId } = drawings.find(drawing => drawing.id === +id);
//   res.send(likedUserId);
// });

// app.get('/category/random', (req, res) => {
//   const randomIndex = Math.floor(Math.random() * categories.length - 0);
//   res.send(categories[randomIndex]);
// });

// app.get('/*', (req, res) => {
//   res.sendFile(path.resolve('/', 'index.html'));
// });
