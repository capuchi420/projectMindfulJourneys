import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export default function signup() {
  let cookies = document.cookie;
  // eslint-disable-next-line
  useEffect(() => {
    if(cookies !== "") window.location.href = '/';
  }, []);

  // eslint-disable-next-line
  const [ person, setPerson ] = useState({
    username: "",
    email: "",
    password: "",
    repeatPassword: ""
  });

  const handleChange = (e) => {
    setPerson(data => ({...data, [e.target.name]: e.target.value}));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    fetch('http://localhost:6543/user/signup', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(person)
    }).then(response => response.json()).then(data => {
      console.log(data)
      if(data.status){
        let date = new Date(new Date().getTime() + (2*24*60*60*1000));
        document.cookie = `id=${data.createdUser._id};expires=${date}`;
        window.location.href = '/';
      }
    })
  }

  return (
    <Container>
      <div className="content">
        <div className="imgWithText">
          <h1>START A NEW JOURNEY WITH US</h1>
        </div>
        <div className="form">
          <form onSubmit={handleSubmit}>
            <div className="header">
              <h1>SIGN UP</h1>
              <p>Already Have An Account? <Link to="/login">Login</Link></p>
            </div>
            <div className="username">
              <label htmlFor="username">Username</label>
              <input type="text" name='username' value={person.username} onChange={handleChange} />
            </div>
            <div className="email">
              <label htmlFor="email">Email Adresa</label>
              <input type="email" name='email' value={person.email} onChange={handleChange} />
            </div>
            <div className="password">
              <label htmlFor="password">Password</label>
              <input type="password" name='password' value={person.password} onChange={handleChange} />
            </div>
            <div className="repeatPassword">
              <label htmlFor="repeatPassword">Repeat Password</label>
              <input type="password" name='repeatPassword' value={person.repeatPassword} onChange={handleChange} />
            </div>
            <div className="submit">
              <button>Create Account</button>
            </div>
          </form>
        </div>
      </div>
    </Container>
  )
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #ccc;
  display: flex;
  align-items: center;
  justify-content: center;

  div.content{
    width: 80%;
    height: 80%;
    background-color: #fff;
    border-radius: 1.6rem;

    div.imgWithText{
      display: none;
    }

    div.form{
      width: 100%;
      height: 100%;
      display: flex;


      form{
        width: 80%;
        margin: auto;

        div.header{
          p{
            margin: .3rem 0 1.2rem 0;
            font-weight: 700;

            a{
              color: #3466AA;
              text-decoration: none;
            }
          }
        }

        div.email{
          color: #C9C9C9;
          margin-bottom: 1rem;
          
          input{
            width: 100%;
            color: #000;
            border: 1px solid #c9c9c9;
            border-radius: .5rem;
            padding: .5rem;

            &:focus{
              outline: none;
            }
          }
        }

        div.repeatPassword{
          color: #C9C9C9;
          margin-bottom: 1rem;
          
          input{
            width: 100%;
            color: #000;
            border: 1px solid #c9c9c9;
            border-radius: .5rem;
            padding: .5rem;

            &:focus{
              outline: none;
            }
          }
        }

        div.username{
          color: #C9C9C9;
          margin-bottom: 1rem;
          
          input{
            width: 100%;
            color: #000;
            border: 1px solid #c9c9c9;
            border-radius: .5rem;
            padding: .5rem;

            &:focus{
              outline: none;
            }
          }
        }

        div.password{
          color: #C9C9C9;
          margin-bottom: 1rem;
          
          input{
            width: 100%;
            color: #000;
            border: 1px solid #c9c9c9;
            border-radius: .5rem;
            padding: .5rem;

            &:focus{
              outline: none;
            }
          }
        }

        div.submit{
          width: 100%;

          button{
            color: #f1f1f1;
            background-color: #82b7dc;
            border: none;
            border-radius: .7rem;
            padding: 1rem 2rem;
            margin: auto;
            display: block;
            transition: all .3s ease-in-out;

            &:hover{
              background-color: #3688c2;
            }
          }
        }
      }
    }
  }

  @media only screen and (min-width: 768px){
    div.content{
      padding: 1rem;
      display: grid;
      grid-template-columns: 1fr 1fr;
      column-gap: 1rem;
      grid-template-rows: 1fr;

      div.imgWithText{
        display: flex;
        align-items: center;
        justify-content: center;
        background-image: url('./assets/photo1.jpg');
        background-size: cover;
        background-repeat: no-repeat;
        width: 100%;
        height: 100%;
        position: relative;
        border-radius: 1.6rem;

        h1{
          width: 90%;
          text-align: center;
          color: #fff;
          z-index: 999; 
        }

        &::after{
          content: "";
          display: block;
          border-radius: 1.6rem;
          position: absolute;
          background-color: #000;
          opacity: .5;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
        }

        
      }
    }

  }
`;
