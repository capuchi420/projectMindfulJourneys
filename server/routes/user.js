import express from 'express';
import { getUser, likeOrDislikePost, login, signup } from '../controllers/user.js';

export const userRouter = express.Router();

userRouter.get('/:id', getUser);

userRouter.post('/login', login);
userRouter.post('/signup', signup);
userRouter.put('/likeOrDislikePost', likeOrDislikePost);