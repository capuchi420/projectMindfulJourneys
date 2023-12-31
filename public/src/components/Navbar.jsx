import React from 'react';
import styled from 'styled-components';

export default function Navbar() {
    const handleLogout = () => {
        document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
        window.location.href = "/login";
    }

  return (
    <Container>
        <div className='flex'>
            <div className='header'>
                <h1>MINDFUL JOURNEYS</h1>
            </div>
            <div className='logout'>
                <i className="fa-solid fa-right-from-bracket" onClick={handleLogout}></i>
            </div>
        </div>
    </Container>
  )
}

const Container = styled.nav`
    width: 100vw;
    padding: 1rem;
    background-color: #82B7DC;

    div.flex{
        display: flex;
        align-items: center;
        justify-content: space-between;

        div.header{
            h1{
                font-size: 1rem;
                cursor: default;
            }
        }

        div.logout{
            i{
                font-size: 1rem;
                cursor: pointer;
                transition: all .3s ease;

                &:hover{
                    color: #fff;
                }
            }
        }
    }
`;
