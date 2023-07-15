import React, { useEffect, useState} from 'react';
import styled from 'styled-components';
import Comment from './Comment';

export default function Post({ post }) {
    let cookie = document.cookie;
    const _id = cookie.slice(cookie.indexOf('=')+1, cookie.length);
    const [username, setUsername] = useState("");
    const [isLiked, setIsLiked] = useState(false);
    const [likes, setLikes] = useState(post.likes);
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState(post.comments);

    useEffect(() => {
      fetch(`http://localhost:6543/user/${_id}`).then(response => response.json()).then(data => {
            if(data.likedPosts.find(el => el == post._id)){
                setIsLiked(true);
            }
        });        
    }, []);

    

    useEffect(() => {
      fetch(`http://localhost:6543/user/${post.user_id}`).then(res => res.json()).then(aaa => setUsername(aaa.username));
    }, []);

    const handleLike = async () => {
        const sendData = {
            user_id: _id,
            post_id: post._id
        };
        fetch(`http://localhost:6543/user/likeOrDislikePost`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(sendData)
        }).then(response => response.json()).then(data => {
            setLikes(data.post.likes);
            setIsLiked(data.liked);
        });
    };

    const handleComment = async (e) => {
      e.preventDefault();
      const commentData = {
        user_id: _id,
        post_id: post._id,
        txt: comment
      };

      fetch(`http://localhost:6543/post/leaveAComment`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(commentData)
      }).then(res => res.json()).then(data => {
        setComments(data.post.comments);
      });

      setComment("");
    }

    const handleChange = (e) => {
      setComment(e.target.value);
    }

  return (
    <Conatiner>
      <div className='info'>
        <div className='user'>{username}</div>
        <div className='likes'>
          <div className='num'><p>{likes}</p></div>
          <div onClick={handleLike} className='like'>
            {isLiked ? <i className="fa-solid fa-heart"></i> : <i className="fa-regular fa-heart"></i>}
          </div>
        </div>
      </div>
      <div className='postContent'>
        <p>{post.txt}</p>
      </div>
      <div className='leaveAComment'>
        <form onSubmit={handleComment} >
          <input type="text" value={comment} onChange={handleChange} />
          <button><i className="fa-regular fa-paper-plane"></i></button>
        </form>
      </div>
      <div className='comments'>
        {comments.map(comment => {
            return <Comment {...comment} />
        }).reverse()}
      </div>
    </Conatiner>
  )
}

const Conatiner = styled.div`
    background-color: #fff;
    margin-bottom: 3rem;
    padding: .7rem;
    border-radius: .5rem;

    div.info{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;

    div.likes{
      display: flex;
      align-items: center;

      div.num{
        margin-right: .5rem;
      }

      div.like{
        i{
          cursor: pointer;
        }
      }
    }
  }

  div.leaveAComment{
    margin-top: .3rem;

    form{
      height: 2.5rem;

      input{
        width: 85%;
        border: none;
        background-color: #eee;
        height: inherit;
        border-radius: .5rem 0 0 .5rem;
        padding: 1rem;

        &:focus{
          outline: none;
        }
      }

      button{
        width: 15%;
        height: inherit;
        border: none;
        background-color: #eee;
        border-radius: 0 .5rem .5rem 0;
      }
    }
  }

  div.comments{
    width: 80%;
    margin: 1.5rem auto 0 auto;

    div.comment{
      margin-bottom: 1rem;

      p{
        font-size: .9rem;
      }

      span{
        margin-top: .3rem;
        font-size: .7rem;
      }
    }
  }
`
