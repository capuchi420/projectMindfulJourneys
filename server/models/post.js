import mongoose from 'mongoose';

const schema = mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    txt: {
        type: String,
        required: true
    },
    comments: {
        type: Array
    },
    likes: {
        type: Number
    }
});

export const postModel = new mongoose.model('Post', schema);