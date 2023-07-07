import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import styled from 'styled-components';
import Posts from '../components/Posts';

export default function Home() {
  let cookies = document.cookie;

  useEffect(() => {
    if(cookies === "") window.location.href = '/login';
  }, []);


  return (
    <Container>
      <Navbar />
      <main className='content'>
        <Posts />
      </main>
    </Container>
  )
}

const Container = styled.div`
    main.content{
      max-width: 90%;
      margin: auto;
      background-color: #82B7DC;
    }
`;
