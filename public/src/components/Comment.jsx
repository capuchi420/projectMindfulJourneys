import React, { useState, useEffect } from 'react';

export default function Comment(props) {
    const [username, setUsername] = useState("");

    useEffect(() => {
        fetch(`http://localhost:6543/user/${props.userId}`).then(res => res.json()).then(data => setUsername(data.username));
        // eslint-disable-next-line
    }, []);

  return (
    <div className='comment'>
      <p>{props.comment}</p>
      <span>{username}</span>
      <hr />
    </div>
  )
}
