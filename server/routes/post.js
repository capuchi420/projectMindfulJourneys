import express from 'express';
import { createPost, getAllPosts } from '../controllers/post.js';

export const postRouter = express.Router();

postRouter.get('/', getAllPosts);

postRouter.post('/createPost', createPost);