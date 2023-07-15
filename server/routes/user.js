import express from 'express';
import { getUser, likeOrDislikePost, login, signup, whoPostIt } from '../controllers/user.js';

export const userRouter = express.Router();

userRouter.get('/:id', getUser);
userRouter.get('/whoPostIt/:id', whoPostIt);

userRouter.post('/login', login);
userRouter.post('/signup', signup);
userRouter.put('/likeOrDislikePost', likeOrDislikePost);