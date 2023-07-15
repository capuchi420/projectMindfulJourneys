import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import styled from 'styled-components';
import Post from '../components/Post';

export default function Home() {
  let cookies = document.cookie;
  const _id = cookies.slice(cookies.indexOf('=')+1, cookies.length);
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState("");

  useEffect(() => {
    if(cookies === "") window.location.href = '/login';
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    fetch('http://localhost:6543/post').then(response => response.json()).then(data => setPosts(data));
  }, []);

  const handleChange = (e) => {
    setPost(e.target.value);
  }

  const handlePost = async (e) => {
    e.preventDefault();

    const postData = {
      user_id: _id,
      txt: post
    };

    fetch(`http://localhost:6543/post/createPost`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postData)
    }).then(res => res.json()).then(data => {
      console.log(data)
      setPosts(data.posts);
    });

    setPost("");
  }

  return (
    <Container>
      <Navbar />
      <main className='content'>
        <div className='posts'>
          <form onSubmit={handlePost}>
            <input type="text" placeholder='Write something...' value={post} onChange={handleChange}/>
            <button><i className="fa-regular fa-paper-plane"></i></button>
          </form>
          {posts.map(post => {
            return <Post post={post} key={post._id} />
          }).reverse()}
        </div>
      </main>
    </Container>
  )
}

const Container = styled.div`
    main.content{
      max-width: 90%;
      margin: auto;
      padding: 2rem 0;
      background-color: #82B7DC;

      form{
        width: 90%;
        margin: 0 auto 2rem auto;
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

      div.posts{
        max-width: 90%;
        margin: auto;
      }
    }
`;
