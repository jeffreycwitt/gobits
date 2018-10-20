import React from 'react'

const User = (props) =>{
  return (
      <div>
        <h2 id="me">Me: {props.user.name} {/*props.user.email*/}</h2>
      </div>
    );
}

export default User
