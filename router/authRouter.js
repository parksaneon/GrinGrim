import express from 'express';
import { signUp, signIn, checkId, logout, auth } from '../controller/authController.js';
import { userUpload } from '../middleware/fileUpload.js';
import isAuth from '../middleware/auth.js';

const userRouter = express.Router();

userRouter.get('/', auth);
userRouter.get('/isAuth', auth);
userRouter.post('/signIn', signIn);
userRouter.post('/signUp', userUpload.single('userImage'), signUp);
userRouter.post('/checkId', checkId);
userRouter.post('/logOut', logout);

export default userRouter;
