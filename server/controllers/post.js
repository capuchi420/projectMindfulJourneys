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
            comments: [],
            likes: 0
        });

        const posts = await postModel.find();
        res.json({ status: true, posts });   
    }catch(err){
        res.json({ status: false, err });
    }
};

export const leaveAComment = async (req, res) => {
    try{
        const { user_id, post_id, txt } = req.body;
        if(!txt) return res.json({ status: false, msg: "Provide a comment"});

        const post = await postModel.findById(post_id);


        const comment = {
            userId: user_id,
            comment: txt
        };

        post.comments.push(comment);
        await postModel.replaceOne({_id: post._id}, post);
        res.send({ status: true, post});
    }catch(err){
        res.json({ status: false, err});
    }
}

