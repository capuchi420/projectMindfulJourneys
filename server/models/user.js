import mongoose from 'mongoose';

const schema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 4,
        max: 12
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        min: 4
    },
    likedPosts: {
        type: Array
    }
});

export const userModel = mongoose.model('User', schema);