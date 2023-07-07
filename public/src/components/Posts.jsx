import React, { useEffect } from 'react';
import styled from 'styled-components';
import Post from './Post';

export default function Posts() {
  var posts = undefined;

  const createPosts = async (posts) => {
    this.posts = posts.map(post => {
      <Post />
    })
  }

  useEffect(() => {
    async function getAllPosts(){
      fetch('http://localhost:6543/post').then(response => response.json()).then(data => {
        data = data.map(post => {
          <Post 
            comments={post.comments}
            likes={post.likes}
            txt={post.txt}
            user_id={post.user_id}  
          />
        });
        console.log(data);
      })
    }

    getAllPosts();
  }, []);


  return (
    <Container>
      {posts}
    </Container>
  )
}

const Container = styled.div`
  max-width: 90%;
  margin: auto;
  background-color: #fff;
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
        font-size: 1.2rem;
      }

      span{
        margin-top: .3rem;
        font-size: .8rem;
      }
    }
  }
`;
