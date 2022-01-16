import jwt from 'jsonwebtoken';

const isAuth = (req, res, next) => {
  try {
    const { accessToken } = req.cookies;
    if (!accessToken) return res.status(401).json('다시 로그인해주세요.');

    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);

    if (decoded) {
      next();
    } else {
      res.json({ isLogin: false });
    }
  } catch (error) {
    res.json({ isLogin: false });
  }
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
