import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import styled from 'styled-components';
import Post from '../components/Post';

export default function Home() {
  let cookies = document.cookie;
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    if(cookies === "") window.location.href = '/login';
  }, []);

  useEffect(() => {
    fetch('http://localhost:6543/post').then(response => response.json()).then(data => setPosts(data));
  }, []);

  return (
    <Container>
      <Navbar />
      <main className='content'>
        <div className='posts'>
          {posts.map(post => {
            return <Post post={post} key={post._id} />
          })}
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

      div.posts{
        max-width: 90%;
        margin: auto;
      }
    }
`;
