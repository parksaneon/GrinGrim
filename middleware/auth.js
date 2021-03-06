import jwt from 'jsonwebtoken';

const isAuth = (req, res, next) => {
  const { accessToken } = req.cookies;

  jwt.verify(accessToken, process.env.JWT_SECRET_KEY, (error, decoded) => {
    if (error) {
      console.log('토큰 없음');
      res.json({ message: '다시 로그인 해주세요!' });
    } else {
      console.log('로그인 성공!');
      req.id = decoded.id;
      next();
    }
  });
};

export default isAuth;

// jwt.verify(accessToken, process.env.JWT_SECRET_KEY, (error, { id }) => {
//   if (error) {
//     const refreshVerify = jwt.verify(findUserById(id).refreshToken, process.env.JWT_SECRET_KEY);

//     if (refreshVerify) {
//       const accessToken = createToken(id, process.env.ACCESS_EXPIRE);
//       setTokenInCookie(res, accessToken);
//       next();
//     } else {
//       return res.status(401).json('다시 로그인해주세요.');
//     }
//   }
// });
