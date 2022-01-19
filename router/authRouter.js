import express from 'express';
import { signUp, signIn, checkId } from '../controller/authController.js';
import { userUpload } from '../middleware/fileUpload.js';

const userRouter = express.Router();

userRouter.post('/signIn', signIn);
userRouter.post('/signUp', userUpload.single('userImage'), signUp);
userRouter.post('/checkId', checkId);

export default userRouter;
