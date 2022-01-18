import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { findUserById, addNewUser } from '../fakeData/users.js';

const createToken = userId =>
  jwt.sign({ userId }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.ACCESS_EXPIRE });

const setTokenInCookie = (res, accessToken) => {
  res.cookie('accessToken', accessToken, {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true
  });
};

export const checkId = (req, res) => {
  const { tempId } = req.body;
  const foundedUser = findUserById(tempId);

  if (foundedUser) res.status(403).json({ message: '이미 존재하는 아이디 입니다.' });
  else res.status(201).json({ message: '사용 가능한 아이디 입니다.' });
};

export const signUp = (req, res) => {
  const { userId, password, nickName } = req.body;
  const { path: userImage } = req.file;
  const hashedPassword = bcrypt.hashSync(password, 10);

  addNewUser({ userId, password: hashedPassword, nickName, userImage });

  const accessToken = createToken(userId);
  setTokenInCookie(res, accessToken);

  res.status(201).json({ nickName });
};

export const signIn = (req, res) => {
  const { userId, password } = req.body;

  const findUser = findUserById(userId);
  if (!findUser) return res.status(401).json({ message: '사용자 정보가 일치하지 않습니다.' });

  const isValidPassword = bcrypt.compareSync(password, findUser.password);
  if (!isValidPassword) return res.status(401).json({ message: '사용자 정보가 일치하지 않습니다.' });

  const accessToken = createToken(userId);
  setTokenInCookie(res, accessToken);

  res.status(201).json({ nickName: findUser.nickName });
};
