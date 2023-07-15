import React, { useState, useEffect } from 'react';

export default function Comment(props) {
    //console.log(props)
    const [username, setUsername] = useState("");

    useEffect(() => {
        fetch(`http://localhost:6543/user/whoPostIt/${props.userId}`).then(response => response.json()).then(data => setUsername(data.username));
    }, []);

  return (
    <div className='comment'>
      <p>{props.comment}</p>
      <span>{username}</span>
      <hr />
    </div>
  )
}
