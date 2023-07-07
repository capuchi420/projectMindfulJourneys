import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import { userRouter } from './routes/user.js';
import { postRouter } from './routes/post.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/user', userRouter);
app.use('/post', postRouter);

app.get('/', (req, res) => {
    res.send("INDEX GET ROUTE")
});

mongoose.connect(process.env.MONGO_URL).then(console.log("DB CONNECTED"))

app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`);
});