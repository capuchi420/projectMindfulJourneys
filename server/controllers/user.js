import { postModel } from '../models/post.js';
import { userModel } from '../models/user.js';
import bcrypt from 'bcrypt';

export const getUser = async (req, res) => {
    const id = req.params.id;
    try{
        const user = await userModel.findById(id);
        res.send(user);
    }catch(err){
        res.send(err);
    }
}

export const whoPostIt = async (req, res) => {
    const { id } = req.param;
    try{
        const user = await userModel.findOne({id});
        res.send(user);
    }catch(err){
        res.send(err);
    }
}

export const login = async (req, res) => {
    try{
        const { email, password } = req.body;
        
        const user = await userModel.findOne({ email });
        if(!user) return res.json({ msg:"No user with this email", status: false });

        const awaitPassword = await bcrypt.compare(password, user.password);

        if(!awaitPassword){
            return res.json({ msg: "Wrong password", status: false });
        }
        
        return res.json({ status: true, user });
    }catch(err){
        res.send(err);
    }
};

export const signup = async (req, res) => {
    try{
        const { username, email, password, repeatPassword } = req.body;
        let user;

        if(!username) return res.json({ msg: "Enter a username", status: false });
        user = await userModel.findOne({ username }); 
        if(user) return res.json({ msg: "Username already in use", status: false });

        if(!email) return res.json({ msg: "Enter an email", status: false });
        user = await userModel.findOne({ email });
        if(user) return res.json({ msg: "Email already in use", status: false });

        if(password !== repeatPassword) return res.json({ msg: "Password are not the same", status: false });

        const hashedPassword = await bcrypt.hash(password, 10); 
        const createdUser = await userModel.create({
            username,
            email,
            password: hashedPassword,
            likedPosts: []
        });

        return res.json({ status: true, createdUser });
    }catch(err){
        res.send(err);
    }
};

export const likeOrDislikePost = async (req, res) => {
    try{
        var liked = false;
        const { post_id, user_id } = req.body;
        const user = await userModel.findById(user_id);
        if(!user) return res.json({ status: false, msg: "No user found" });

        const post = await postModel.findById(post_id);
        if(!post) return res.json({ status: false, msg: "No post found" });

        if(user.likedPosts.find(post => post == post_id)){
            post.likes--;
            user.likedPosts.splice(user.likedPosts.indexOf(post_id), 1);
            if(user.likedPosts.length == 1 && user.likedPosts[0] == post_id){
                user.likedPosts = [];
            }
        }else{
            liked = true;
            post.likes++;
            user.likedPosts.push(post._id);
        }

        await userModel.replaceOne({_id: user._id}, user);
        await postModel.replaceOne({_id: post._id}, post);
        res.send({status: true, liked, post, user});
    }catch(err){
        res.send({status: false, err});
    }
};