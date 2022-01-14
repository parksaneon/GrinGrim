import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { findUserById, addNewUser } from '../fakeData/users.js';

const createToken = (id, expiresIn) => jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn });

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
  console.log(req.body);
  const { userId, password, nickName } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  addNewUser({ userId, password: hashedPassword, nickName });

  const accessToken = createToken(userId, process.env.ACCESS_EXPIRE);
  setTokenInCookie(res, accessToken);
  res.status(201).json({ userId });
};

export const signIn = (req, res) => {
  console.log(req.body);
  const { userId, password } = req.body;

  const findUser = findUserById(userId);
  if (!findUser) return res.status(401).json({ message: '사용자 정보가 일치하지 않습니다.' });

  const isValidPassword = bcrypt.compareSync(password, findUser.password);
  if (!isValidPassword) return res.status(401).json({ message: '사용자 정보가 일치하지 않습니다.' });

  const accessToken = createToken(userId, process.env.ACCESS_EXPIRE);
  setTokenInCookie(res, accessToken);
  res.status(201).json({ nickName: findUser.nickName });
};
