import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const scretKey = "S7Ox$4tOWRCG2L@useM4%DQvbj%l$fsY";
let users = [{ userId: "bnb135", password: "$2b$10$Vg/ijKMZKg8c/1C9RnTXduLiUvabxqH2aJ6CBoFL4xHVSn6u8R51m" }];
// let checkValidateId = false;

const createJwtToken = id => jwt.sign({ id }, scretKey, { expiresIn: "1d" });

// const validateId = userId => {
//   const foundId = users.find(user => userId === user.userId);
//   if (foundId) return res.status(409).json({ message: `${userId}는 이미 존재하는 아이디 입니다.` });
//   checkValidateId = true;
// };

export const signUp = (req, res) => {
  // if (!checkValidateId) return res.status(409).json({ message: "아이디 유효성 검사를 해주세요" });
  // const { userId, password, nickName, userImg } = req.body;
  const { userId, password } = req.body;

  const hashedPassword = bcrypt.hashSync(password, 10);
  users = [{ userId, password: hashedPassword }, ...users];

  const token = createJwtToken(userId);
  res.status(201).json({ userId, token });
};

export const signIn = (req, res) => {
  const { userId, password } = req.body;

  const findUser = users.find(user => userId === user.userId);
  if (!findUser) return res.status(401).json({ message: "사용자 정보가 일치하지 않습니다." });

  const isValidPassword = bcrypt.compareSync(password, findUser.password);
  if (!isValidPassword) return res.status(401).json({ message: "사용자 정보가 일치하지 않습니다." });
  console.log(1);
  res.cookie("accessToken", createJwtToken(userId), {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true
  });
  res.status(201).json({ userId });
};
