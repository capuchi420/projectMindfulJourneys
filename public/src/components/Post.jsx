import React, { useEffect, useState } from 'react'

export default function Post(props) {
  const [username, setUsername] = useState("");

  useEffect(() => {
    async function user(){
        fetch('http://localhost:6543/user', {
    body: JSON.stringify(props.user_id)
  }).then(response => response.json()).then(data => {
    console.log(data);
  })
    }

    user();
  }, []);
  

  return (
    <>
      <div className='info'>
        <div className='user'>Cone</div>
        <div className='likes'>
          <div className='num'><p>17</p></div>
          <div>
            <i className="fa-regular fa-heart"></i>
          </div>
        </div>
      </div>
      <div className='postContent'>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perspiciatis et dignissimos rerum cupiditate qui exercitationem asperiores reiciendis sunt dolorem molestias?</p>
      </div>
      <div className='leaveAComment'>
        <form>
          <input type="text" />
          <button><i class="fa-regular fa-paper-plane"></i></button>
        </form>
      </div>
      <div className='comments'>
        <div className='comment'>
          <p>skraaa</p>
          <span>nickname</span>
          <hr />
        </div>
      </div>
    </>
  )
}
