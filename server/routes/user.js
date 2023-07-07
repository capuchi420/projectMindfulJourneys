import express from 'express';
import { getUser, likeOrDislikePost, login, signup } from '../controllers/user.js';

export const userRouter = express.Router();

userRouter.get('/', getUser);

userRouter.post('/login', login);
userRouter.post('/signup', signup);
userRouter.post('/likeOrDislikePost', likeOrDislikePost);