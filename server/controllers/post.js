import { postModel } from "../models/post.js";

export const getAllPosts = async (req, res) => {
    try{
        const posts = await postModel.find();
        res.send(posts);
    }catch(err){
        res.send(err);
    }
}

export const createPost = async (req, res) => {
    try{
        const { user_id, txt } = req.body;

        if(!user_id) return res.json({ status: false, msg: "No user id provided" });
        if(!txt) return res.json({ status: false, msg: "No text" });

        const post = await postModel.create({
            user_id,
            txt,
            comments: [{
                userId: 123,
                comment: "aaaaaaaaaaa"
            }],
            likes: 69
        });

        res.json({ status: true, post });   
    }catch(err){
        res.json({ status: false, err });
    }
};

