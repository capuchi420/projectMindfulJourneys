import express from 'express';
import { createPost, getAllPosts, leaveAComment } from '../controllers/post.js';

export const postRouter = express.Router();

postRouter.get('/', getAllPosts);

postRouter.post('/createPost', createPost);
postRouter.put('/leaveAComment', leaveAComment);