import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import path from 'path';

import authRouter from './router/authRouter.js';
import drawingsRouter from './router/drawingsRouter.js';
import categoryRouter from './router/categoryRouter.js';

const __dirname = path.resolve();

dotenv.config();

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

app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'src/index.html'));
});

// port 생성 서버 실행
app.listen(port, () => {
  console.log('Server running ....');
});
