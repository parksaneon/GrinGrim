import express from 'express';
import { signUp, signIn, checkId } from '../controller/authController.js';
import imgUpload from '../middleware/fileUpload.js';

const userRouter = express.Router();

userRouter.post('/signIn', signIn);
userRouter.post('/signUp', imgUpload.single('userImage'), signUp);
userRouter.post('/checkId', checkId);

export default userRouter;
